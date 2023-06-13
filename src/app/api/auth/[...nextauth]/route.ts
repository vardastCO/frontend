import { LoginUserDocument, LoginUserMutation } from "@/generated";
import { GraphQLClient } from "graphql-request";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin'
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
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


                const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT || '')
                try {
                    const data: LoginUserMutation = await client.request(LoginUserDocument, {
                        loginInput: {
                            username,
                            password
                        }
                    })

                    if (!data) {
                        return null
                    }

                    return {
                        token: data.login.accessToken,
                        expires: Date.now() + data.login.accessTokenTtl,
                        profile: data.login.user
                    }
                } catch (error) {
                    // @ts-ignore
                    throw new Error(error.response.errors[0].extensions.displayMessage);
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                session.user = token.user as any
            }
            return session;
        },
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
