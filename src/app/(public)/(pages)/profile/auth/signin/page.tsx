import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import withMobileHeader from "@core/middlewares/withMobileHeader"

import SigninForm from "./components/SigninForm"

const SigninPage = async () => {
  const session = await getServerSession(authOptions)

  if (
    session?.profile.roles.some(
      (role) => role?.name === "admin" || role?.name === "product_moderator"
    )
  ) {
    redirect("/admin")
  }

  return <SigninForm />
}

export default withMobileHeader(SigninPage, {
  title: "ورود به حساب کاربری",
  hasBack: {}
})
