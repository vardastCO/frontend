import { Metadata } from "next"
import { redirect } from "next/navigation"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"

import ProfileIndex from "./components"

// set dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "حساب کاربری"
  }
}

const ProfilePage = async ({ ...params }) => {
  const isMobileView = CheckIsMobileView()

  console.log(params)

  if (!isMobileView) {
    redirect("/")
  }

  return <ProfileIndex />
}

export default ProfilePage
