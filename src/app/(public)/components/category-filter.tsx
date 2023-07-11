"use client"

import { useQuery } from "@tanstack/react-query"

import { Category, GetCategoryQuery } from "@/generated"

import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"

import CategoryFilterItem from "./category-filter-item"

interface CategoryFilterProps {
  selectedCategoryId: number
}

const CategoryFilter = ({ selectedCategoryId }: CategoryFilterProps) => {
  const { data } = useQuery<GetCategoryQuery>({
    queryKey: ["category", { id: selectedCategoryId }],
    queryFn: () => getCategoryQueryFn(selectedCategoryId)
  })

  return (
    <div>
      <div className="mb-4 font-bold text-gray-800">دسته‌بندی</div>
      {data && (
        <div className="max-h-[400px] overflow-y-auto">
          <ol className="flex flex-col gap-2 [&_ol]:ms-6">
            {data.category.parentCategory ? (
              <li className="flex flex-col gap-2">
                <CategoryFilterItem
                  category={data.category.parentCategory as Category}
                />
                <ol className="flex flex-col gap-2">
                  <li className="flex flex-col gap-2">
                    <CategoryFilterItem category={data.category as Category} />
                    <ol className="flex flex-col gap-2">
                      {data.category.children.map((category) => (
                        <li key={category?.id}>
                          <CategoryFilterItem category={category as Category} />
                        </li>
                      ))}
                    </ol>
                  </li>
                </ol>
              </li>
            ) : (
              <li>
                <CategoryFilterItem category={data.category as Category} />
                <ol className="flex flex-col gap-2">
                  {data.category.children.map((category) => (
                    <li key={category?.id}>
                      <CategoryFilterItem category={category as Category} />
                    </li>
                  ))}
                </ol>
              </li>
            )}
          </ol>
        </div>
      )}
    </div>
  )
}

export default CategoryFilter
