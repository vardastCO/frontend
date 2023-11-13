"use client"

import { useQuery } from "@tanstack/react-query"

import {
  Category,
  GetCategoryQuery,
  GetCategoryQueryVariables
} from "@/generated"

import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import FilterBlock from "@/app/(public)/components/filter-block"

import CategoryFilterItem from "./category-filter-item"

interface CategoryFilterProps {
  selectedCategoryId: number
}

const CategoryFilter = ({ selectedCategoryId }: CategoryFilterProps) => {
  const args: GetCategoryQueryVariables = {}
  args["id"] = selectedCategoryId
  const { data } = useQuery<GetCategoryQuery>({
    queryKey: [QUERY_FUNCTIONS_KEY.CATEGORY_QUERY_KEY, args],
    queryFn: () => getCategoryQueryFn(selectedCategoryId)
  })

  return (
    <FilterBlock title="دسته‌بندی" openDefault={true}>
      {data && (
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
      )}
    </FilterBlock>
  )
}

export default CategoryFilter
