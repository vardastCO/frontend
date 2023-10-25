import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import SingupForm from "@/app/(public)/(pages)/profile/auth/signup/components/SingupForm"

const SignupPage = async () => {
  const session = await getServerSession(authOptions)

  if (
    session?.profile.roles.some(
      (role) => role?.name === "admin" || role?.name === "seller"
    )
  ) {
    redirect("/admin")
  }

  return <SingupForm />
}

export default SignupPage
