"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { GetVocabularyQuery } from "@/generated"

import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import CategoryListContainer from "@/app/(public)/(pages)/categories/components/CategoryListContainer"
import CategoryListItem from "@/app/(public)/(pages)/categories/components/CategoryListItem"
import { ICategoryListLoader } from "@/app/(public)/(pages)/categories/components/CategoryListLoader"
import CategorySkeleton from "@/app/(public)/(pages)/categories/components/CategorySkeleton"
import NoProductFound from "@/app/(public)/components/no-product-found"

const VocabulariesPage = () => {
  const [selectedItemId, setSelectedItemId] =
    useState<ICategoryListLoader>(null)
  const getVocabularyQueryFcQuery = useQuery<GetVocabularyQuery>({
    queryKey: ["vocabulary", { slug: "product_categories" }],
    queryFn: () => getVocabularyQueryFn("product_categories")
  })

  if (getVocabularyQueryFcQuery.isLoading) {
    return (
      <CategoryListContainer>
        <CategorySkeleton />
      </CategoryListContainer>
    )
  }

  if (!getVocabularyQueryFcQuery.data) {
    return <NoProductFound />
  }

  return (
    <CategoryListContainer>
      {getVocabularyQueryFcQuery.data?.vocabulary?.categories.map(
        (category) =>
          category && (
            <CategoryListItem
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

export default VocabulariesPage
