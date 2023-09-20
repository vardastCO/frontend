import { Metadata } from "next"
import { redirect } from "next/navigation"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"

import MobileGlobalCategoriesFilter from "../../components/mobile-global-categories-filter"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "دسته بندی "
  }
}

const ContactPage = async () => {
  const isMobileView = CheckIsMobileView()

  if (!isMobileView) {
    redirect("/")
  }

  return <MobileGlobalCategoriesFilter />
}

export default ContactPage
