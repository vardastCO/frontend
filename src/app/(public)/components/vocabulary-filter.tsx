"use client"

import { useQuery } from "@tanstack/react-query"

import { Category, Vocabulary } from "@/generated"

import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"

import CategoryFilterItem from "./category-filter-item"

const VocabularyFilter = () => {
  const { data } = useQuery<{ vocabulary: Vocabulary }>({
    queryKey: ["vocabulary", { slug: "product_categories" }],
    queryFn: () => getVocabularyQueryFn("product_categories")
  })

  return (
    <div>
      <div className="mb-4 font-bold text-gray-800">دسته‌بندی</div>
      {data && (
        <div className="max-h-[400px] overflow-y-auto">
          <ol className="flex flex-col gap-2">
            {data.vocabulary.categories.map((category) => (
              <li key={category?.id}>
                <CategoryFilterItem category={category as Category} />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

export default VocabularyFilter
