import { GraphQLClient } from "graphql-request"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import {
  GetWhoAmIDocument,
  GetWhoAmIQuery,
  LoginUserDocument,
  LoginUserMutation,
  LoginWithOtpDocument,
  LoginWithOtpMutation,
  RefreshUserMutation,
  RefreshUserMutationDocument
} from "@/generated"

import AuthLogger from "@core/lib/auth-logger"

async function refreshAccessToken(tokenObject: any) {
  try {
    // Get a new set of tokens with a refreshToken
    const client = new GraphQLClient(
      process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT || ""
    )
    const data: RefreshUserMutation = await client.request(
      RefreshUserMutationDocument,
      {
        refreshInput: {
          accessToken: tokenObject.accessToken,
          refreshToken: tokenObject.refreshToken
        }
      }
    )

    if (!data) {
      return null
    }

    return {
      ...tokenObject,
      userId: data.refresh.user.id,
      abilities: data.refresh.abilities,
      accessToken: data.refresh.accessToken,
      accessTokenTtl: data.refresh.accessTokenTtl + Date.now(),
      refreshToken: data.refresh.refreshToken,
      refreshTokenTtl: data.refresh.refreshTokenTtl + Date.now()
    }
  } catch (error) {
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError"
    }
  }
}

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    signOut: "/"
  },
  logger: AuthLogger(),
  providers: [
    CredentialsProvider({
      name: "Otp",
      type: "credentials",
      credentials: {
        cellphone: { label: "Cellphone", type: "text" },
        validationKey: { label: "ValidationKey", type: "text" },
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        signInType: { label: "SignInType", type: "text" }
      },
      // @ts-ignore
      authorize: async (credentials, request) => {
        try {
          const { signInType, username, password, cellphone, validationKey } =
            credentials as {
              cellphone: string
              validationKey: string
              username: string
              password: string
              signInType: string
            }

          const client = new GraphQLClient(
            process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT || "",
            {
              headers: {
                "user-agent": request.headers
                  ? request.headers["user-agent"]
                  : ""
              }
            }
          )

          if (signInType === "otp") {
            const data: LoginWithOtpMutation = await client.request(
              LoginWithOtpDocument,
              {
                LoginOTPInput: {
                  cellphone,
                  validationKey
                }
              }
            )
            if (!data) {
              throw new Error("Authorization failed")
            }

            return {
              accessToken: data.loginWithOtp.accessToken,
              accessTokenTtl: data.loginWithOtp.accessTokenTtl + Date.now(),
              refreshToken: data.loginWithOtp.refreshToken,
              refreshTokenTtl: data.loginWithOtp.refreshTokenTtl + Date.now(),
              userId: data.loginWithOtp.user.id,
              abilities: data.loginWithOtp.abilities
            }
          }
          if (signInType === "username") {
            const data: LoginUserMutation = await client.request(
              LoginUserDocument,
              {
                loginInput: {
                  username,
                  password
                }
              }
            )

            if (!data) {
              throw new Error("Authorization failed")
            }

            return {
              accessToken: data.login.accessToken,
              accessTokenTtl: data.login.accessTokenTtl + Date.now(),
              refreshToken: data.login.refreshToken,
              refreshTokenTtl: data.login.refreshTokenTtl + Date.now(),
              userId: data.login.user.id,
              abilities: data.login.abilities
            }
          }
        } catch (error) {
          console.error("Error in authorize function:", error)
          return Promise.resolve(null)
        }
        return credentials
      },
      async signOut({ callbackUrl }: { callbackUrl: string }) {
        // Your sign-out logic here
        // Redirect the user to the specified callbackUrl after signing out
        return {
          url: callbackUrl || "/" // Default to the root path if callbackUrl is not provided
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      try {
        if (user) {
          token.userId = user.userId
          token.abilities = user.abilities
          token.accessToken = user.accessToken
          token.accessTokenTtl = user.accessTokenTtl
          token.refreshToken = user.refreshToken
          token.refreshTokenTtl = user.refreshTokenTtl
        }

        const shouldRefreshTime = Math.round(
          (token.accessTokenTtl as number) - Date.now()
        )

        if (shouldRefreshTime > 0) {
          return Promise.resolve(token)
        }

        token = await refreshAccessToken(token)

        return Promise.resolve(token)
      } catch (error) {
        console.error("Error in jwt callback:", error)
      }
      return token
    },
    session: async ({ session, token }) => {
      try {
        const userClient = new GraphQLClient(
          process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT || "",
          {
            headers: {
              authorization: `Bearer ${token.accessToken}`
            }
          }
        )

        const userInfo: GetWhoAmIQuery =
          await userClient.request(GetWhoAmIDocument)
        session.accessToken = token.accessToken as string
        session.accessTokenTtl = token.accessTokenTtl as number
        session.refreshToken = token.refreshToken as string
        session.refreshTokenTtl = token.refreshTokenTtl as number
        session.profile = userInfo.whoAmI as any
        session.abilities = token.abilities as string[]
        session.error = token.error as string
        return session
      } catch (error) {
        console.error("Error in session callback:", error)
      }
      return session
    },
    // @ts-ignore
    onError: async (error, _, __) => {
      console.error("NextAuth.js error:", error)
      return false
    }
  }
}
