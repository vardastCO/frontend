"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { GetCategoryQuery } from "@/generated"

import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"
import CategoryListContainer from "@/app/(public)/(pages)/categories/components/CategoryListContainer"
import CategoryListItem from "@/app/(public)/(pages)/categories/components/CategoryListItem"
import { ICategoryListLoader } from "@/app/(public)/(pages)/categories/components/CategoryListLoader"
import CategorySkeleton from "@/app/(public)/(pages)/categories/components/CategorySkeleton"

interface CategoriesListProps {
  categoryId: string
}

const CategoriesPage = ({ categoryId }: CategoriesListProps) => {
  const [selectedItemId, setSelectedItemId] =
    useState<ICategoryListLoader>(null)

  const getCategoryQueryFnQuery = useQuery<GetCategoryQuery>({
    queryKey: ["category", { id: categoryId }],
    queryFn: () => getCategoryQueryFn(+categoryId)
  })

  if (getCategoryQueryFnQuery.isLoading) {
    return <CategorySkeleton isSubCategory />
  }

  if (!getCategoryQueryFnQuery.data) {
    return <></>
  }

  return (
    <CategoryListContainer
      isSubcategory
      description={
        getCategoryQueryFnQuery.data.category.description ?? undefined
      }
    >
      {getCategoryQueryFnQuery.data?.category?.children.map(
        (category) =>
          category && (
            <CategoryListItem
              isSubCategory
              onClick={() => {
                setSelectedItemId(category.id)
              }}
              href={
                category.childrenCount > 0
                  ? `/categories/${category.id}?title=${category.title}`
                  : `/search/${category.id}/${category.title}?title=${category.title}`
              }
              selectedItemId={selectedItemId}
              key={category.id}
              title={category.title}
              productsCount={category.productsCount}
              id={category.id}
              src={
                (category &&
                  category?.imageCategory &&
                  (category?.imageCategory[0]?.file.presignedUrl
                    ?.url as string)) ??
                "" ??
                `/images/categories/${category.id}.png`
              }
            />
          )
      )}
    </CategoryListContainer>
  )
}

export default CategoriesPage
