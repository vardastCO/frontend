import { Metadata } from "next"
import { dehydrate } from "@tanstack/react-query"

import { IndexProductInput, ProductSortablesEnum } from "@/generated"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import ProductsPage from "@/app/(public)/(pages)/products/components/products-page"

type SearchIndexProps = {
  params: { slug: Array<string | number> }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: SearchIndexProps
  // parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    if (params.slug && params.slug.length) {
      const category = await getCategoryQueryFn(+params.slug[0])

      return {
        title: category.category.title
      }
    }
  } catch (error) {
    console.log("generateMetadata category")
  }

  return {
    title: "دسته بندی یافت نشد"
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
      if (key.includes("attributes[")) {
        const regex = /attributes\[(\d+)\]/
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

  await queryClient.prefetchInfiniteQuery(
    [QUERY_FUNCTIONS_KEY.ALL_PRODUCTS_QUERY_KEY, args],
    () => getAllProductsQueryFn(args)
  )

  if (slug && slug.length) {
    await queryClient.prefetchQuery(
      [QUERY_FUNCTIONS_KEY.CATEGORY_QUERY_KEY, { id: +slug[0] }],
      () => getCategoryQueryFn(+slug[0])
    )
  } else {
    await queryClient.prefetchQuery(
      [
        QUERY_FUNCTIONS_KEY.VOCABULARY_QUERY_KEY,
        { slug: "product_categories" }
      ],
      () => getVocabularyQueryFn("product_categories")
    )
  }

  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <ProductsPage slug={slug} args={args} isMobileView={isMobileView} />
    </ReactQueryHydrate>
  )
}
export default withMobileHeader(SearchIndex, {})
