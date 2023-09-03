import { GraphQLClient } from "graphql-request"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import {
<<<<<<< HEAD
    GetWhoAmIDocument,
    GetWhoAmIQuery,
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
            authorize: async (credentials, request) => {
                const { username, password } = credentials as {
                    username: string
                    password: string
                }

                console.log("SIGNIN: ==========================" + Date.now())

                const client = new GraphQLClient(
                    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT || "",
                    {
                        headers: {
                            ...request.headers
                        }
                    }
                )

                console.log(
                    "SIGNIN: ==========================" + Date.now() + " " + client
                )

                try {
                    console.log("SIGNIN: ==========================" + Date.now())
                    const data: LoginUserMutation = await client.request(
                        LoginUserDocument,
                        {
                            loginInput: {
                                username,
                                password
                            }
                        }
                    )

                    console.log(
                        "SIGNIN: ==========================" + Date.now() + " " + data
                    )

                    if (!data) {
                        return null
                    }

                    return {
                        accessToken: data.login.accessToken,
                        accessTokenTtl: data.login.accessTokenTtl + Date.now(),
                        refreshToken: data.login.refreshToken,
                        refreshTokenTtl: data.login.refreshTokenTtl + Date.now(),
                        userId: data.login.user.id,
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
            console.log("JWT: ==========================" + Date.now() + " " + user)
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
            console.log(
                "SESSION: ==========================" + Date.now() + " " + token
            )
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
=======
  GetWhoAmIDocument,
  GetWhoAmIQuery,
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
      authorize: async (credentials, request) => {
        const { username, password } = credentials as {
          username: string
          password: string
        }

        console.log("SIGNIN: ==========================" + Date.now())

        const client = new GraphQLClient(
          process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT || "",
          {
            headers: {
              ...request.headers
            }
          }
        )

        console.log(
          "SIGNIN: ==========================" + Date.now() + " " + client
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

          console.log(
            "SIGNIN: ==========================" + Date.now() + " " + data
          )

          if (!data) {
            return null
          }

          return {
            accessToken: data.login.accessToken,
            accessTokenTtl: data.login.accessTokenTtl + Date.now(),
            refreshToken: data.login.refreshToken,
            refreshTokenTtl: data.login.refreshTokenTtl + Date.now(),
            userId: data.login.user.id,
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
      console.log("JWT: ==========================" + Date.now() + " " + user)
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
      console.log(
        "SESSION: ==========================" + Date.now() + " " + token
      )
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
>>>>>>> b2bbd82ffd4657d78975b0279e94595e81f950a0
}
