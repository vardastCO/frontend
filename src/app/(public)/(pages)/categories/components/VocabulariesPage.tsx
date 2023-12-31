"use client"

import { useQuery } from "@tanstack/react-query"

import { GetVocabularyQuery } from "@/generated"

import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import CategoriesList from "@/app/(public)/(pages)/categories/components/CategoriesList"

const VocabulariesPage = () => {
  const { data, isLoading } = useQuery<GetVocabularyQuery>({
    queryKey: [
      QUERY_FUNCTIONS_KEY.VOCABULARY_QUERY_KEY,
      { slug: "product_categories" }
    ],
    queryFn: () => getVocabularyQueryFn("product_categories")
  })

  return (
    <CategoriesList data={data?.vocabulary.categories} isLoading={isLoading} />
  )
}

export default VocabulariesPage
