import { Metadata, ResolvingMetadata } from "next"
import { dehydrate } from "@tanstack/react-query"

import { IndexProductInput, ProductSortablesEnum } from "@/generated"

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
  searchParams
}: SearchIndexProps) => {
  const isMobileView = CheckIsMobileView()
  const queryClient = getQueryClient()

  const args: IndexProductInput = {}
  args["page"] =
    searchParams.page && +searchParams.page[0] > 0 ? +searchParams.page[0] : 1
  if (slug && slug.length) args["categoryIds"] = [+slug[0]]
  if (searchParams.query && searchParams.query.length)
    args["query"] = searchParams.query as string

  if (searchParams.orderBy) {
    args["orderBy"] = searchParams.orderBy as ProductSortablesEnum
  } else {
    args["orderBy"] = ProductSortablesEnum.Newest
  }
  args["attributes"] = []

  if (searchParams) {
    for (const key in searchParams) {
      if (key.includes("attribute[")) {
        const regex = /attribute\[(\d+)\]/
        const match = key.match(regex)

        if (match && match.length === 2) {
          const id = parseInt(match[1], 10)
          const value: string[] = Array.isArray(searchParams[key])
            ? (searchParams[key] as string[])
            : ([searchParams[key]] as string[])

          value.forEach((val) => {
            args["attributes"]?.push({ id, value: val })
          })
        }
      }
    }
  }

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
      <SearchPage slug={slug} args={args} isMobileView={isMobileView} />
    </ReactQueryHydrate>
  )
}

export default SearchIndex
