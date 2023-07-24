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
  FilterAttribute,
  GetAllProductsQuery,
  IndexProductInput,
  InputMaybe,
  Product,
  ProductSortablesEnum,
  useGetAllFilterableAttributesBasicsQuery
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/ui/button"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import BrandOrSellerCategoryFilter from "@/app/(public)/components/brand-category-filter"
import CategoryFilter from "@/app/(public)/components/category-filter"
import FiltersContainer from "@/app/(public)/components/filters-container"
import MobileFilterableAttributes from "@/app/(public)/components/mobile-filterable-attributes"
import MobileSortFilter from "@/app/(public)/components/mobile-sort-filter"
import NoProductFound from "@/app/(public)/components/no-product-found"
import ProductCount from "@/app/(public)/components/product-count"
import ProductPagination from "@/app/(public)/components/product-pagination"
import ProductSort from "@/app/(public)/components/product-sort"
import { PublicContext } from "@/app/(public)/components/public-provider"
import VocabularyFilter from "@/app/(public)/components/vocabulary-filter"

import ProductCard from "./product-card"

interface ProductListProps {
  isMobileView: RegExpMatchArray | null
  args: IndexProductInput
  selectedCategoryId: number
  brandId?: number
  sellerId?: number
}

const ProductList = ({
  isMobileView,
  args,
  selectedCategoryId,
  brandId,
  sellerId
}: ProductListProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()!
  const { push } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(args.page || 1)
  const [sort, setSort] = useState<ProductSortablesEnum>(
    args.orderBy || ProductSortablesEnum.Newest
  )
  const [filterAttributes, setFilterAtrributes] = useState<FilterAttribute[]>(
    args["attributes"] || []
  )
  const [categoriesIdFilter, setCategoriesIdFilter] = useState<
    (typeof args)["categoryId"][]
  >([args["categoryId"]] || [])
  const {
    globalCategoriesFilterVisibilityAtom,
    sortFilterVisibilityAtom,
    filtersVisibilityAtom
  } = useContext(PublicContext)
  const setGlobalCategoriesFilterVisibility = useSetAtom(
    globalCategoriesFilterVisibilityAtom
  )
  const setSortFilterVisibility = useSetAtom(sortFilterVisibilityAtom)
  const setFiltersVisibility = useSetAtom(filtersVisibilityAtom)

  const getFilterableAttributesQuery = useGetAllFilterableAttributesBasicsQuery(
    graphqlRequestClient,
    {
      filterableAttributesInput: {
        categoryId: selectedCategoryId
      }
    },
    {
      enabled: !!selectedCategoryId
    }
  )

  const { data, error } = useQuery<GetAllProductsQuery>(
    [
      "products",
      {
        ...args,
        page: currentPage,
        attributes: filterAttributes,
        orderBy: sort
      }
    ],
    () =>
      getAllProductsQueryFn({
        ...args,
        page: currentPage,
        attributes: filterAttributes,
        orderBy: sort
      }),
    {
      keepPreviousData: true
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

  const onCategoryIdFilterChanged = ({
    status,
    value
  }: { value: InputMaybe<number> } & { status: CheckedState }) => {
    setCategoriesIdFilter((values) => {
      let tmp = values
      if (status === true) {
        tmp = [...tmp, value]
      } else if (status === false) {
        tmp = tmp.filter((item) => item !== value)
      }

      const params = new URLSearchParams(searchParams as any)
      const paramsKeys = params.keys()
      for (const key of paramsKeys) {
        if (key.includes("categoryId")) {
          params.delete(key)
        }
      }
      tmp.forEach((item) => {
        item && params.append(`categoryId`, `${item}`)
      })
      push(pathname + "?" + params.toString())

      return tmp
    })
  }

  if (!data) notFound()

  return (
    <>
      {isMobileView && (
        <>
          <MobileSortFilter
            sort={sort}
            onSortChanged={(sort) => {
              setSortFilterVisibility(false)
              setSort(sort)
              const params = new URLSearchParams(searchParams as any)
              params.set("orderBy", `${sort}`)
              push(pathname + "?" + params.toString())
            }}
          />
          <div className="mt-2 flex items-start gap-2">
            {selectedCategoryId !== 0 &&
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
                    {filterAttributes.length > 0 && (
                      <span className="absolute -right-1 -top-1 block h-2.5 w-2.5 rounded-full bg-brand-500"></span>
                    )}
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
              onClick={() => setGlobalCategoriesFilterVisibility(true)}
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
        </>
      )}

      <div
        className={clsx([
          "",
          isMobileView
            ? ""
            : "grid grid-cols-1 gap-5 md:grid-cols-[4fr_8fr] lg:grid-cols-[3fr_9fr]"
        ])}
      >
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

              {selectedCategoryId !== 0 && !brandId && !sellerId && (
                <CategoryFilter selectedCategoryId={selectedCategoryId} />
              )}

              {brandId && (
                <BrandOrSellerCategoryFilter
                  categoriesIdFilter={categoriesIdFilter}
                  onCategoryIdFilterChanged={onCategoryIdFilterChanged}
                  brandId={brandId}
                />
              )}

              {sellerId && (
                <BrandOrSellerCategoryFilter
                  categoriesIdFilter={categoriesIdFilter}
                  onCategoryIdFilterChanged={onCategoryIdFilterChanged}
                  sellerId={sellerId}
                />
              )}

              {selectedCategoryId !== 0 && (
                <FiltersContainer
                  selectedCategoryId={selectedCategoryId}
                  filterAttributes={filterAttributes}
                  onFilterAttributesChanged={onFilterAttributesChanged}
                />
              )}

              {selectedCategoryId === 0 && !brandId && !sellerId && (
                <VocabularyFilter />
              )}
            </div>
          </div>
        )}

        <div>
          {data.products.data.length > 0 ? (
            <>
              <div className="flex items-center border-b border-gray-200 py-1 md:py-3">
                <ProductSort
                  sort={sort}
                  onSortChanged={(sort) => {
                    setSort(sort)
                    const params = new URLSearchParams(searchParams as any)
                    params.set("orderBy", `${sort}`)
                    push(pathname + "?" + params.toString())
                  }}
                />
                <ProductCount count={data.products.total || 0} />
              </div>

              <div>
                <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
                  {data.products.data.map((product, idx) => (
                    <ProductCard key={idx} product={product as Product} />
                  ))}
                </div>
                {data.products.lastPage && data.products.lastPage > 1 && (
                  <ProductPagination
                    total={data.products.lastPage}
                    currentPage={currentPage}
                    onChange={(page) => {
                      setCurrentPage(page)
                      const params = new URLSearchParams(searchParams as any)
                      params.set("page", `${page}`)
                      push(pathname + "?" + params.toString())
                    }}
                  />
                )}
              </div>
            </>
          ) : (
            <NoProductFound />
          )}
        </div>
      </div>
    </>
  )
}

export default ProductList
