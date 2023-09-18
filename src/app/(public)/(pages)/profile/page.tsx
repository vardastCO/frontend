import { Metadata } from "next"
import { redirect } from "next/navigation"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import withTitle from "@core/middlewares/withTitle"

import ProfileIndex from "./components"

// set dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "حساب کاربری"
  }
}

const ProfilePage = async () => {
  const isMobileView = CheckIsMobileView()

  if (!isMobileView) {
    redirect("/")
  }

  return <ProfileIndex />
}

export default withTitle(ProfilePage, { title: "حساب کاربری" })
