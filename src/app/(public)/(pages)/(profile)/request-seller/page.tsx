import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import ProfileSellerForm from "@/app/(public)/(pages)/(profile)/request-seller/components/ProfileSellerForm"

// set dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "درخواست تبدیل به فروشنده"
  }
}

const ProfileSellerPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.profile.roles.some((role) => role?.name === "user")) {
    redirect("/")
  }

  return <ProfileSellerForm />
}

export default withMobileHeader(ProfileSellerPage, {
  title: "درخواست تبدیل به فروشنده"
})
