"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { Category, GetVocabularyQuery } from "@/generated"

import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import FilterBlock from "@/app/(public)/components/filter-block"

import CategoryFilterItem from "./category-filter-item"

const VocabularyFilter = () => {
  const [open, setOpen] = useState(false)

  const { data } = useQuery<GetVocabularyQuery>({
    queryKey: ["vocabulary", { slug: "product_categories" }],
    queryFn: () => getVocabularyQueryFn("product_categories")
  })

  return (
    <FilterBlock title="دسته‌بندی" openDefault={true}>
      {data && (
        <ol className="flex flex-col gap-2">
          {data.vocabulary.categories.map(
            (category) =>
              category && (
                <li key={category.id}>
                  <CategoryFilterItem category={category as Category} />
                </li>
              )
          )}
        </ol>
      )}
    </FilterBlock>
  )
}

export default VocabularyFilter
