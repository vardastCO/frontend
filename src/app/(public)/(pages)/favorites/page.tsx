import { Metadata } from "next"
import { redirect } from "next/navigation"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import withMobileHeader from "@core/middlewares/withMobileHeader"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "علاقه مندی ها"
  }
}

const ContactPage = async () => {
  const isMobileView = CheckIsMobileView()

  if (!isMobileView) {
    redirect("/")
  }

  return <div>favorites</div>
}

export default withMobileHeader(ContactPage, { title: "علاقه مندی ها" })
