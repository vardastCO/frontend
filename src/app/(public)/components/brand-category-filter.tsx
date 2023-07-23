"use client"

import { useQuery } from "@tanstack/react-query"

import {
  Category,
  GetAllCategoriesQuery,
  IndexCategoryInput
} from "@/generated"

import { getAllCategoriesQueryFn } from "@core/queryFns/allCategoriesQueryFns"
import FilterBlock from "@/app/(public)/components/filter-block"

import CategoryFilterItem from "./category-filter-item"

interface BrandCategoryFilterProps {
  brandId: number
}

const BrandCategoryFilter = ({ brandId }: BrandCategoryFilterProps) => {
  const args: IndexCategoryInput = {}
  args["brandId"] = brandId
  const { data } = useQuery<GetAllCategoriesQuery>({
    queryKey: ["categories", args],
    queryFn: () => getAllCategoriesQueryFn(args)
  })

  console.log(data)

  return (
    <FilterBlock title="دسته‌بندی" openDefault={true}>
      {data && (
        <ol className="flex flex-col gap-2 [&_ol]:ms-6">
          <li>
            <ol className="flex flex-col gap-2">
              {data.categories.data.map((category) => (
                <li key={category?.id}>
                  <CategoryFilterItem category={category as Category} />
                </li>
              ))}
            </ol>
          </li>
        </ol>
      )}
    </FilterBlock>
  )
}

export default BrandCategoryFilter
