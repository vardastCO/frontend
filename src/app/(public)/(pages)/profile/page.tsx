import { Metadata } from "next"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import withMobileHeader from "@core/middlewares/withMobileHeader"

import ProfileIndex from "./components"

// set dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "حساب کاربری"
  }
}

const ProfilePage = async () => {
  const session = await getServerSession(authOptions)

  return <ProfileIndex session={session} />
}

export default withMobileHeader(ProfilePage, { title: "حساب کاربری" })
