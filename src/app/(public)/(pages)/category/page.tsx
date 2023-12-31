import { Metadata } from "next"
import { dehydrate } from "@tanstack/react-query"

import { GetVocabularyQuery } from "@/generated"

import getQueryClient from "@core/clients/getQueryClient"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import VocabulariesPage from "@/app/(public)/(pages)/category/components/VocabulariesPage"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "دسته‌بندی‌ها"
  }
}

const CategoriesPage = async () => {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery<GetVocabularyQuery>({
    queryKey: [
      QUERY_FUNCTIONS_KEY.VOCABULARY_QUERY_KEY,
      { slug: "product_categories" }
    ],
    queryFn: () => getVocabularyQueryFn("product_categories")
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <VocabulariesPage />
    </ReactQueryHydrate>
  )
}
export default withMobileHeader(CategoriesPage, {
  title: "دسته‌بندی‌ها"
})
