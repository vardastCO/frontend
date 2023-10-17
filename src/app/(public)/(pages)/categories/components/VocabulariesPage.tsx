"use client"

import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { GetVocabularyQuery } from "@/generated"

import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import CategoryListContainer from "@/app/(public)/(pages)/categories/components/CategoryListContainer"
import CategoryListItem from "@/app/(public)/(pages)/categories/components/CategoryListItem"
import CategorySkeleton from "@/app/(public)/(pages)/categories/components/CategorySkeleton"

const VocabulariesPage = () => {
  const router = useRouter()

  const getVocabularyQueryFcQuery = useQuery<GetVocabularyQuery>({
    queryKey: ["vocabulary", { slug: "product_categories" }],
    queryFn: () => getVocabularyQueryFn("product_categories")
  })

  if (getVocabularyQueryFcQuery.isLoading) {
    return <CategorySkeleton />
  }

  if (!getVocabularyQueryFcQuery.data) {
    return <></>
  }

  return (
    <CategoryListContainer>
      {getVocabularyQueryFcQuery.data?.vocabulary?.categories.map(
        (category) =>
          category && (
            <CategoryListItem
              onClick={() => {
                // setSelectedItemId(category.id)
                if (category.childrenCount > 0) {
                  return router.push(
                    `/categories/${category.id}?title=${category.title}`
                  )
                }
                router.push(
                  `/search/${category.id}/${category.title}?title=${category.title}`
                )
              }}
              selectedItemId={null}
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
