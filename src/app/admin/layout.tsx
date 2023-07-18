import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import AdminLayoutComponent from "@/app/admin/components/admin-layout"

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return <AdminLayoutComponent>{children}</AdminLayoutComponent>
}
