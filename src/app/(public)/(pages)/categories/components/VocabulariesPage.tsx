"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { GetVocabularyQuery } from "@/generated"

import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
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
    queryKey: [
      QUERY_FUNCTIONS_KEY.VOCABULARY_QUERY_KEY,
      { slug: "product_categories" }
    ],
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
                  ? `/categories/${category.id}/${category.title}`
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
                `/images/categories/${category.id}.png`
              }
            />
          )
      )}
    </CategoryListContainer>
  )
}

export default VocabulariesPage
