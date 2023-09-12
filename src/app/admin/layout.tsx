import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { signOut } from "next-auth/react"

import { authOptions } from "@core/lib/authOptions"
import AdminLayoutComponent from "@/app/admin/components/AdminLayout"

export const dynamic = "force-dynamic"

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/profile/auth/signin")
  if (session.error === "RefreshAccessTokenError") {
    signOut({ callbackUrl: "/profile/auth/signin", redirect: true })
  }

  return <AdminLayoutComponent>{children}</AdminLayoutComponent>
}
