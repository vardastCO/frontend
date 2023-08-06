import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import SingupForm from "@/app/auth/signup/components/SingupForm"

const SignupPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/admin")
  }

  return <SingupForm />
}

export default SignupPage
