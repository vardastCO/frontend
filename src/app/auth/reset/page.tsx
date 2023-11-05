import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import ResetForm from "@/app/auth/reset/components/ResetForm"

const ResetPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/admin")
  }

  return <ResetForm />
}

export default ResetPage
