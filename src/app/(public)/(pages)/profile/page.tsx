import { redirect } from "next/navigation"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"

import MobileMySpace from "../../components/mobile-global-my-space"

const ContactPage = async () => {
  const isMobileView = CheckIsMobileView()

  if (!isMobileView) {
    redirect("/")
  }

  return <MobileMySpace />
}

export default ContactPage
