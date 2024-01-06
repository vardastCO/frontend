import { Metadata } from "next"
import { dehydrate } from "@tanstack/react-query"

import getQueryClient from "@core/clients/getQueryClient"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import CategoriesPage from "@/app/(public)/(pages)/category/components/CategoriesPage"

interface CategoryIdPageIndexProps {
  params: {
    categoryId: string
  }
}

export async function generateMetadata(
  { params }: CategoryIdPageIndexProps
  // parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const data = await getCategoryQueryFn(+params.categoryId)

    return {
      title: data.category.title,
      description: data.category.description,
      alternates: {
        canonical: encodeURI(
          `${process.env.NEXT_PUBLIC_URL}/category/${data.category.id}/${data.category.title}`
        )
      }
    }
  } catch (error) {
    console.log("generateMetadata category")
  }

  return {
    title: "دسته بندی یافت نشد"
  }
}

const CategoryIdPage: React.FC<CategoryIdPageIndexProps> = async ({
  params: { categoryId }
}) => {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(
    [QUERY_FUNCTIONS_KEY.CATEGORY_QUERY_KEY, { id: categoryId[0] }],
    () => getCategoryQueryFn(+categoryId[0])
  )
  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <CategoriesPage categoryId={categoryId[0]} />
    </ReactQueryHydrate>
  )
}

export default withMobileHeader(CategoryIdPage, {})
