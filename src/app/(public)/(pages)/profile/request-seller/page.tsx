import { Metadata } from "next"

import ProfileSellerForm from "@/app/(public)/(pages)/profile/request-seller/components/ProfileSellerForm"

// set dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "درخواست تبدیل به فروشنده"
  }
}

const ProfileSellerPage = async () => {
  return <ProfileSellerForm />
}

export default ProfileSellerPage
