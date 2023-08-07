import { GraphQLClient } from "graphql-request"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import {
  LoginUserDocument,
  LoginUserMutation,
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

    return {
      ...tokenObject,
      profile: data.refresh.user,
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

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin"
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      // @ts-ignore
      authorize: async (credentials) => {
        const { username, password } = credentials as {
          username: string
          password: string
        }

        const client = new GraphQLClient(
          process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT || ""
        )
        try {
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
            return null
          }

          return {
            accessToken: data.login.accessToken,
            accessTokenTtl: data.login.accessTokenTtl + Date.now(),
            refreshToken: data.login.refreshToken,
            refreshTokenTtl: data.login.refreshTokenTtl + Date.now(),
            profile: data.login.user,
            abilities: data.login.abilities
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
        token.profile = user.profile
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
      if (token) {
        session.accessToken = token.accessToken as string
        session.accessTokenTtl = token.accessTokenTtl as number
        session.refreshToken = token.refreshToken as string
        session.refreshTokenTtl = token.refreshTokenTtl as number
        session.profile = token.profile as any
        session.abilities = token.abilities as string[]
        session.error = token.error as string
      }
      return session
    }
  }
}
