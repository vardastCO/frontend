"use client"

import { useState } from "react"

import { GetCategoryQuery } from "@/generated"

import CategoryListContainer from "@/app/(public)/(pages)/category/components/CategoryListContainer"
import CategoryListItem from "@/app/(public)/(pages)/category/components/CategoryListItem"
import { ICategoryListLoader } from "@/app/(public)/(pages)/category/components/CategoryListLoader"
import CategorySkeleton from "@/app/(public)/(pages)/category/components/CategorySkeleton"

interface CategoriesListProps {
  isLoading: boolean
  isSubcategory?: boolean
  description?: string
  data?: GetCategoryQuery["category"]["children"]
}

const CategoriesList = ({
  isLoading,
  description,
  data,
  isSubcategory
}: CategoriesListProps) => {
  const [selectedItemId, setSelectedItemId] =
    useState<ICategoryListLoader>(null)

  if (isLoading) {
    return (
      <CategoryListContainer>
        <CategorySkeleton isSubCategory={isSubcategory} />
      </CategoryListContainer>
    )
  }

  return (
    <CategoryListContainer
      isSubcategory={isSubcategory}
      description={description}
    >
      {data?.map(
        (category) =>
          category && (
            <CategoryListItem
              isSubCategory={isSubcategory}
              onClick={() => {
                setSelectedItemId(category.id)
              }}
              href={
                category.childrenCount > 0
                  ? `/category/${category.id}/${category.title}`
                  : `/products/${category.id}/${category.title}`
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
                `/images/category/${category.id}.png`
              }
            />
          )
      )}
    </CategoryListContainer>
  )
}

export default CategoriesList
