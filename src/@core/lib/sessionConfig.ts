import type { IronSessionOptions } from "iron-session";
import type { User } from "../types/User";

export const sessionOptions: IronSessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: "app_cookie",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

declare module 'iron-session' {
    interface IronSession {
        user?: User
    }
}
