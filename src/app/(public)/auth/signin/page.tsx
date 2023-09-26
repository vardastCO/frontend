import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"

import SigninForm from "./components/SigninForm"

const SigninPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/admin")
  }

  return <SigninForm />
}

export default SigninPage
