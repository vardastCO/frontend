import { User as BaseUser } from "@/generated"

import "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    refreshToken?: string
    accessTokenTtl?: number
    refreshTokenTtl?: number
    error?: string
    profile: BaseUser
  }
}

declare module "next-auth" {
  interface User {
    accessToken?: string
    refreshToken?: string
    accessTokenTtl?: number
    refreshTokenTtl?: number
    profile: BaseUser
  }
}
