"use client"

import { useQuery } from "@tanstack/react-query"

import { Category } from "@/generated"

import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"

import CategoryFilterItem from "./category-filter-item"

interface CategoryFilterProps {
  selectedCategory?: string
}

const CategoryFilter = ({ selectedCategory }: CategoryFilterProps) => {
  const { data } = useQuery<{ category: Category }>({
    queryKey: ["category"],
    queryFn: () => getCategoryQueryFn(selectedCategory || "")
  })

  return (
    <div>
      <div className="font-bold text-gray-800">دسته‌بندی</div>
      {data && (
        <div className="max-h-[400px] overflow-y-auto">
          <ol className="flex flex-col gap-2">
            {data.category.children.map((category) => (
              <CategoryFilterItem
                category={category as Category}
                key={category?.id}
              />
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

export default CategoryFilter
