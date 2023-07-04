import { Metadata, ResolvingMetadata } from "next"
import { dehydrate } from "@tanstack/react-query"

import getQueryClient from "@core/clients/getQueryClient"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"
import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import SearchPage from "@/app/(public)/search/components/search-page"

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

const SearchIndex = async ({ params: { slug } }: SearchIndexProps) => {
  const queryClient = getQueryClient()
  if (slug && slug.length) {
    await queryClient.prefetchQuery(
      ["products", { categoryId: +slug[0] }],
      () => getAllProductsQueryFn({ categoryId: +slug[0] })
    )
    await queryClient.prefetchQuery(["category", { id: +slug[0] }], () =>
      getCategoryQueryFn(+slug[0])
    )
  } else {
    await queryClient.prefetchQuery(["products", {}], () =>
      getAllProductsQueryFn()
    )
    await queryClient.prefetchQuery(
      ["vocabulary", { slug: "product_categories" }],
      () => getVocabularyQueryFn("product_categories")
    )
  }
  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <SearchPage slug={slug} />
    </ReactQueryHydrate>
  )
}

export default SearchIndex
