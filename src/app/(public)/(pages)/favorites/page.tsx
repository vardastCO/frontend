import { Metadata } from "next"
import { redirect } from "next/navigation"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import FavoritesComponent from "@/app/(public)/(pages)/favorites/components/FavoritesComponent"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "علاقه مندی ها"
  }
}

const FavoritePage = async () => {
  const isMobileView = CheckIsMobileView()

  if (!isMobileView) {
    redirect("/")
  }

  return <FavoritesComponent />
}

export default withMobileHeader(FavoritePage, { title: "علاقه مندی ها" })
