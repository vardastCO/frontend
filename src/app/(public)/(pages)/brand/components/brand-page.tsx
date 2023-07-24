"use client"

import { useContext, useState } from "react"
import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation"
import { CheckedState } from "@radix-ui/react-checkbox"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"
import { useSetAtom } from "jotai"
import {
  LucideLayoutGrid,
  LucideSlidersHorizontal,
  LucideSortDesc
} from "lucide-react"

import {
  Brand,
  FilterAttribute,
  GetBrandQuery,
  IndexProductInput,
  useGetAllFilterableAttributesBasicsQuery
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/ui/button"
import { getBrandQueryFn } from "@core/queryFns/brandQueryFns"
import BrandHeader from "@/app/(public)/(pages)/brand/components/brand-header"
import FiltersContainer from "@/app/(public)/components/filters-container"
import MobileFilterableAttributes from "@/app/(public)/components/mobile-filters"
import ProductList from "@/app/(public)/components/product-list"
import { PublicContext } from "@/app/(public)/components/public-provider"

interface BrandPageProps {
  isMobileView: RegExpMatchArray | null
  slug: Array<string | number>
  args: IndexProductInput
}

const BrandPage = ({ isMobileView, args, slug }: BrandPageProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const [filterAttributes, setFilterAtrributes] = useState<FilterAttribute[]>(
    args["attributes"] || []
  )
  const {
    categoriesFilterVisibilityAtom,
    sortFilterVisibilityAtom,
    filtersVisibilityAtom
  } = useContext(PublicContext)
  const setCategoriesFilterVisibility = useSetAtom(
    categoriesFilterVisibilityAtom
  )
  const setSortFilterVisibility = useSetAtom(sortFilterVisibilityAtom)
  const setFiltersVisibility = useSetAtom(filtersVisibilityAtom)

  const selectedCategory = slug && slug.length > 0 ? +slug[0] : 0
  const getFilterableAttributesQuery = useGetAllFilterableAttributesBasicsQuery(
    graphqlRequestClient,
    {
      filterableAttributesInput: {
        categoryId: selectedCategory
      }
    },
    {
      enabled: !!selectedCategory
    }
  )

  const onFilterAttributesChanged = ({
    status,
    id,
    value
  }: FilterAttribute & { status: CheckedState }) => {
    setFilterAtrributes((values) => {
      let tmp = values
      if (status === true) {
        tmp = [
          ...tmp,
          {
            id,
            value
          }
        ]
      } else if (status === false) {
        tmp = tmp.filter(
          (item) => `${item.id}+${item.value}` !== `${id}+${value}`
        )
      }

      const params = new URLSearchParams(searchParams as any)
      const paramsKeys = params.keys()
      for (const key of paramsKeys) {
        if (key.includes("attribute")) {
          params.delete(key)
        }
      }
      tmp.forEach((attribute) => {
        params.append(`attribute[${attribute.id}]`, attribute.value)
      })
      push(pathname + "?" + params.toString())

      return tmp
    })
  }

  const { data, error } = useQuery<GetBrandQuery>(
    ["brand", { id: +slug[0] }],
    () => getBrandQueryFn(+slug[0]),
    {
      keepPreviousData: true
    }
  )

  if (!data) notFound()

  return (
    <div
      className={clsx([
        "container mx-auto px-4 pt-1",
        isMobileView ? "" : "md:py-8"
      ])}
    >
      {isMobileView && (
        <div className="mb-2 flex items-start gap-2">
          {selectedCategory !== 0 &&
            getFilterableAttributesQuery.data &&
            getFilterableAttributesQuery.data.filterableAttributes.filters
              .length > 0 && (
              <>
                <Button
                  onClick={() => setFiltersVisibility(true)}
                  size="small"
                  variant="ghost"
                  className="border border-gray-200"
                >
                  <LucideSlidersHorizontal className="icon text-gray-400" />
                  فیلترها
                </Button>
                <MobileFilterableAttributes
                  filterAttributes={filterAttributes}
                  onFilterAttributesChanged={({ status, id, value }) => {
                    onFilterAttributesChanged({ status, id, value })
                    setFiltersVisibility(false)
                  }}
                  onRemoveAllFilters={() => {
                    setFilterAtrributes([])
                    setFiltersVisibility(false)
                  }}
                />
              </>
            )}
          <Button
            onClick={() => setCategoriesFilterVisibility(true)}
            size="small"
            variant="ghost"
            className="border border-gray-200"
          >
            <LucideLayoutGrid className="icon text-gray-400" />
            دسته‌بندی‌ها
          </Button>
          <Button
            onClick={() => setSortFilterVisibility(true)}
            size="small"
            variant="ghost"
            className="border border-gray-200"
          >
            <LucideSortDesc className="icon text-gray-400" />
            مرتب‌سازی
          </Button>
        </div>
      )}
      <BrandHeader brand={data.brand as Brand} />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-[4fr_8fr] lg:grid-cols-[3fr_9fr]">
        {!isMobileView && (
          <div>
            <div className="divide-y divide-gray-200 rounded-md border border-gray-300 px-4">
              <div className="-mx-4 flex items-center p-4">
                <strong>فیلترها</strong>
                {filterAttributes.length > 0 && (
                  <Button
                    size="small"
                    noStyle
                    className="ms-auto text-sm text-red-500"
                    onClick={() => setFilterAtrributes([])}
                  >
                    حذف همه فیلترها
                  </Button>
                )}
              </div>
              <FiltersContainer
                brandId={+slug[0]}
                filterAttributes={filterAttributes}
                onFilterAttributesChanged={onFilterAttributesChanged}
              />
            </div>
          </div>
        )}
        <div>
          <ProductList args={args} filterAttributes={filterAttributes} />
        </div>
      </div>
    </div>
  )
}

export default BrandPage
