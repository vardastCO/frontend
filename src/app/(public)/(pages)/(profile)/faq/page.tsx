import { Metadata } from "next"
import { dehydrate } from "@tanstack/react-query"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getAllFaqQueryFns } from "@core/queryFns/getAllFaqQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import Faq from "@/app/(public)/(pages)/(profile)/faq/components/Faq"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "سوالات متداول"
  }
}

const ContactPage = async () => {
  const isMobileView = CheckIsMobileView()
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(
    [QUERY_FUNCTIONS_KEY.GET_ALL_FAQ],
    getAllFaqQueryFns
  )

  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Faq isMobileView={isMobileView} />
    </ReactQueryHydrate>
  )
}

export default withMobileHeader(ContactPage, {
  title: "سوالات متداول"
})
