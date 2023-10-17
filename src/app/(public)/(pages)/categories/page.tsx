import { Metadata } from "next"
import { redirect } from "next/navigation"
import { dehydrate } from "@tanstack/react-query"

import { GetVocabularyQuery } from "@/generated"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import VocabulariesPage from "@/app/(public)/(pages)/categories/components/VocabulariesPage"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "دسته بندی ها"
  }
}

const CategoriesPage = async () => {
  const isMobileView = CheckIsMobileView()
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery<GetVocabularyQuery>({
    queryKey: ["vocabulary", { slug: "product_categories" }],
    queryFn: () => getVocabularyQueryFn("product_categories")
  })
  const dehydratedState = dehydrate(queryClient)

  if (!isMobileView) {
    redirect("/")
  }

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <VocabulariesPage />
    </ReactQueryHydrate>
  )
}
export default withMobileHeader(CategoriesPage, {
  title: "دسته بندی ها"
})
