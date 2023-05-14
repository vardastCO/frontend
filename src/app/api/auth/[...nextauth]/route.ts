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


                const client = new GraphQLClient('http://localhost:3080/graphql')
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
                    profile: data.login.user
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user);
            return token;
        },
        session: async ({ session, token }) => {
            session.user = token.user;  // Setting token in session
            return session;
        },
    }
}

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
