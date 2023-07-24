"use client"

import * as Checkbox from "@radix-ui/react-checkbox"
import * as Label from "@radix-ui/react-label"
import { useQuery } from "@tanstack/react-query"
import { LucideCheck } from "lucide-react"

import {
  GetAllCategoriesQuery,
  IndexCategoryInput,
  InputMaybe
} from "@/generated"

import { getAllCategoriesQueryFn } from "@core/queryFns/allCategoriesQueryFns"
import { RequireAtLeastOne } from "@core/types/RequireAtLeastOne"
import FilterBlock from "@/app/(public)/components/filter-block"

interface BrandCategoryFilterInterface {
  brandId?: number
  sellerId?: number
  categoriesIdFilter: (InputMaybe<number> | undefined)[]
  onCategoryIdFilterChanged: ({
    status,
    value
  }: { value: InputMaybe<number> } & { status: Checkbox.CheckedState }) => void
}

type BrandCategoryFilterProps = RequireAtLeastOne<
  BrandCategoryFilterInterface,
  "brandId" | "sellerId"
>

const BrandOrSellerCategoryFilter = ({
  brandId,
  sellerId,
  categoriesIdFilter,
  onCategoryIdFilterChanged
}: BrandCategoryFilterProps) => {
  const args: IndexCategoryInput = {}
  if (brandId) args["brandId"] = brandId
  //   TODO
  //   if (sellerId) args["sellerId"] = sellerId
  const { data } = useQuery<GetAllCategoriesQuery>({
    queryKey: ["categories", args],
    queryFn: () => getAllCategoriesQueryFn(args)
  })

  const categories = data && data.categories ? data.categories.data : undefined

  return (
    <FilterBlock title="دسته‌بندی" openDefault={true}>
      <div className="flex flex-col gap-3">
        {categories &&
          categories.map(
            (category) =>
              category && (
                <Label.Root
                  key={category.id}
                  className="flex items-center gap-2"
                >
                  <Checkbox.Root
                    className="flex
                    h-5
                    w-5
                    appearance-none
                    items-center
                    justify-center
                    rounded-md
                    border-2
                    border-gray-600
                    bg-white
                    outline-none
                    data-[state='checked']:border-brand-500
                    data-[state='checked']:bg-brand-500"
                    checked={
                      categoriesIdFilter &&
                      categoriesIdFilter.some((item) => item === category.id)
                    }
                    onCheckedChange={(checked) =>
                      onCategoryIdFilterChanged({
                        status: checked,
                        value: category.id
                      })
                    }
                  >
                    <Checkbox.Indicator className="text-white">
                      <LucideCheck className="h-3 w-3" strokeWidth={3} />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className="inline-block leading-none">
                    {category.title}
                  </span>
                </Label.Root>
              )
          )}
      </div>
    </FilterBlock>
  )
}

export default BrandOrSellerCategoryFilter
