import { GraphQLClient } from "graphql-request"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import {
  GetWhoAmIDocument,
  GetWhoAmIQuery,
  LoginWithOtpDocument,
  LoginWithOtpMutation,
  RefreshUserMutation,
  RefreshUserMutationDocument
} from "@/generated"

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
    signIn: "/profile/auth/signin",
    signOut: "/"
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        cellphone: { label: "Cellphone", type: "text" },
        validationKey: { label: "ValidationKey", type: "text" }
      },
      // @ts-ignore
      authorize: async (credentials, request) => {
        const { cellphone, validationKey } = credentials as {
          cellphone: string
          validationKey: string
        }

        const client = new GraphQLClient(
          process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT || "",
          {
            headers: {
              "user-agent": request.headers ? request.headers["user-agent"] : ""
            }
          }
        )

        try {
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
            return null
          }

          return {
            accessToken: data.loginWithOtp.accessToken,
            accessTokenTtl: data.loginWithOtp.accessTokenTtl + Date.now(),
            refreshToken: data.loginWithOtp.refreshToken,
            refreshTokenTtl: data.loginWithOtp.refreshTokenTtl + Date.now(),
            userId: data.loginWithOtp.user.id,
            abilities: data.loginWithOtp.abilities
          }
        } catch (error) {
          // @ts-ignore
          throw new Error(error.response.errors[0].extensions.displayMessage)
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
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
    },
    session: async ({ session, token }) => {
      const userClient = new GraphQLClient(
        process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT || "",
        {
          headers: {
            authorization: `Bearer ${token.accessToken}`
          }
        }
      )

      try {
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
        // @ts-ignore
        throw new Error(error.response.errors[0].extensions.displayMessage)
      }
    }
  }
}
