"use client"

import { useEffect } from "react"
import { signOut } from "next-auth/react"

import Loading from "@core/components/shared/Loading"

export default function SignOutPage() {
  useEffect(() => {
    signOut({ callbackUrl: "/auth/signin", redirect: true })
  }, [])

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Loading message="لطفا منتظر بمانید..." />
    </div>
  )
}
