import { Metadata, ResolvingMetadata } from "next"
import { dehydrate } from "@tanstack/react-query"

import { IndexProductInput } from "@/generated"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"
import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import SearchPage from "@/app/(public)/(pages)/search/components/search-page"

type SearchIndexProps = {
  params: { slug: Array<string | number> }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: SearchIndexProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (params.slug && params.slug.length) {
    const category = await getCategoryQueryFn(+params.slug[0])

    return {
      title: category.category.title
    }
  }

  return {
    title: "جستجو در وردست"
  }
}

const SearchIndex = async ({
  params: { slug },
  searchParams: { query, page }
}: SearchIndexProps) => {
  const isMobileView = CheckIsMobileView()
  const queryClient = getQueryClient()

  const args: IndexProductInput = { page: page ? +page : 1 }
  if (slug && slug.length) args["categoryId"] = +slug[0]

  await queryClient.prefetchQuery(["products", args], () =>
    getAllProductsQueryFn(args)
  )

  if (slug && slug.length) {
    await queryClient.prefetchQuery(["category", { id: +slug[0] }], () =>
      getCategoryQueryFn(+slug[0])
    )
  } else {
    await queryClient.prefetchQuery(
      ["vocabulary", { slug: "product_categories" }],
      () => getVocabularyQueryFn("product_categories")
    )
  }

  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <SearchPage slug={slug} isMobileView={isMobileView} />
    </ReactQueryHydrate>
  )
}

export default SearchIndex
