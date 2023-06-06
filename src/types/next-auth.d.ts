import "next-auth";

declare module "next-auth" {
    // interface User extends LoginUserMutation { }
    interface Session {
        user?: {
            token?: string,
            expires?: number,
            profile: User
        }
    }
    interface User {
        token?: string,
        expires?: number,
        profile: User
    }
}
