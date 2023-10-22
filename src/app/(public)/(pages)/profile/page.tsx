import { Metadata } from "next"

import ProfileIndex from "./components"

// set dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "حساب کاربری"
  }
}

const ProfilePage = async () => {
  return <ProfileIndex />
}

export default ProfilePage
