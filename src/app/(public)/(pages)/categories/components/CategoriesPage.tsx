"use client"

import { useQuery } from "@tanstack/react-query"

import { GetCategoryQuery } from "@/generated"

import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import CategoriesList from "@/app/(public)/(pages)/categories/components/CategoriesList"

interface CategoriesListProps {
  categoryId: string
}

const CategoriesPage = ({ categoryId }: CategoriesListProps) => {
  const { data, isLoading } = useQuery<GetCategoryQuery>({
    queryKey: [QUERY_FUNCTIONS_KEY.CATEGORY_QUERY_KEY, { id: categoryId }],
    queryFn: () => getCategoryQueryFn(+categoryId)
  })

  return (
    <CategoriesList
      data={data?.category.children}
      isLoading={isLoading}
      description={data?.category.description ?? undefined}
      isSubcategory
    />
  )
}

export default CategoriesPage
