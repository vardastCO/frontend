import { Metadata } from "next"
import { redirect } from "next/navigation"
import { dehydrate } from "@tanstack/react-query"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import CategoriesPage from "@/app/(public)/(pages)/categories/components/CategoriesPage"

interface CategoryIdPageIndexProps {
  params: {
    categoryId: string
  }
}

export async function generateMetadata(
  { params }: CategoryIdPageIndexProps
  // parent: ResolvingMetadata
): Promise<Metadata> {
  const data = await getCategoryQueryFn(+params.categoryId)

  return {
    title: data.category.title,
    description: data.category.description
  }
}

const CategoryIdPage: React.FC<CategoryIdPageIndexProps> = async ({
  params: { categoryId }
}) => {
  const isMobileView = CheckIsMobileView()
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(
    [QUERY_FUNCTIONS_KEY.CATEGORY_QUERY_KEY, { id: categoryId[0] }],
    () => getCategoryQueryFn(+categoryId[0])
  )
  const dehydratedState = dehydrate(queryClient)

  if (!isMobileView) {
    redirect("/")
  }

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <CategoriesPage categoryId={categoryId[0]} />
    </ReactQueryHydrate>
  )
}

export default withMobileHeader(CategoryIdPage, {})
