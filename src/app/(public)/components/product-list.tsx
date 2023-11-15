"use client"

import { useContext, useEffect, useState } from "react"
import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation"
import { CheckedState } from "@radix-ui/react-checkbox"
import { useInfiniteQuery } from "@tanstack/react-query"
import clsx from "clsx"
import { useSetAtom } from "jotai"
import {
  LucideLayoutGrid,
  LucideSlidersHorizontal,
  LucideSortDesc
} from "lucide-react"
import { useInView } from "react-intersection-observer"

import {
  FilterAttribute,
  GetAllProductsQuery,
  IndexProductInput,
  InputMaybe,
  Product,
  ProductSortablesEnum,
  useGetAllFilterableAttributesBasicsQuery
} from "@/generated"

import graphqlRequestClientWithoutToken from "@core/clients/graphqlRequestClientWithoutToken"
import { Button } from "@core/components/ui/button"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import BrandOrSellerCategoryFilter from "@/app/(public)/components/brand-or-seller-category-filter"
import CategoryFilter from "@/app/(public)/components/category-filter"
import FiltersContainer from "@/app/(public)/components/filters-container"
import MobileCategoriesFilter from "@/app/(public)/components/mobile-categories-filter"
import MobileFilterableAttributes from "@/app/(public)/components/mobile-filterable-attributes"
import MobileSortFilter from "@/app/(public)/components/mobile-sort-filter"
import NoProductFound from "@/app/(public)/components/no-product-found"
import ProductSort from "@/app/(public)/components/product-sort"
import { PublicContext } from "@/app/(public)/components/public-provider"
import VocabularyFilter from "@/app/(public)/components/vocabulary-filter"

import ProductCard, { ProductCardLoader } from "./product-card"

interface ProductListProps {
  isMobileView: boolean
  args: IndexProductInput
  selectedCategoryIds: InputMaybe<number[]> | undefined
  brandId?: number
  sellerId?: number
}

const ProductList = ({
  isMobileView,
  args,
  selectedCategoryIds,
  brandId,
  sellerId
}: ProductListProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { push } = useRouter()
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(5)
  const { ref, inView } = useInView({ threshold: 0.4 })
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState<number>(args.page || 1)
  const [sort, setSort] = useState<ProductSortablesEnum>(
    args.orderBy || ProductSortablesEnum.Newest
  )
  const [filterAttributes, setFilterAtrributes] = useState<FilterAttribute[]>(
    args["attributes"] || []
  )
  const [categoryIdsFilter, setCategoryIdsFilter] = useState<
    (typeof args)["categoryIds"]
  >(args["categoryIds"] || [])
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

  const getFilterableAttributesQuery = useGetAllFilterableAttributesBasicsQuery(
    graphqlRequestClientWithoutToken,
    {
      filterableAttributesInput: {
        categoryId:
          !!selectedCategoryIds && selectedCategoryIds.length === 1
            ? selectedCategoryIds[0]
            : 0
      }
    },
    {
      enabled: !!selectedCategoryIds && selectedCategoryIds.length === 1
    }
  )

  const allProductsQuery = useInfiniteQuery<GetAllProductsQuery>(
    [
      QUERY_FUNCTIONS_KEY.ALL_PRODUCTS_QUERY_KEY,
      {
        ...args,
        page: currentPage,
        attributes: filterAttributes,
        orderBy: sort
      }
    ],
    ({ pageParam = 1 }) =>
      getAllProductsQueryFn({
        ...args,
        page: pageParam,
        attributes: filterAttributes,
        orderBy: sort
      }),
    {
      keepPreviousData: true,
      getNextPageParam(lastPage, allPages) {
        return lastPage.products.data.length > 0
          ? allPages.length + 1
          : undefined
      }
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
        if (key.includes("attributes[")) {
          params.delete(key)
        }
      }
      tmp.forEach((attribute) => {
        params.append(`attributes[${attribute.id}]`, attribute.value)
      })
      push(pathname + "?" + params.toString())

      return tmp
    })
  }

  const onCategoryIdsFilterChanged = ({
    status,
    value
  }: { value: InputMaybe<number> } & { status: CheckedState }) => {
    setCategoryIdsFilter((values) => {
      let tmp: InputMaybe<number[]> = values || []
      if (status === true) {
        tmp = Array.isArray(tmp)
          ? ([...tmp, value] as InputMaybe<number[]>)
          : ([value] as InputMaybe<number[]>)
      } else if (status === false) {
        tmp = tmp.filter((item) => item !== value)
      }

      const params = new URLSearchParams(searchParams as any)
      const paramsKeys = params.keys()
      for (const key of paramsKeys) {
        if (key.includes("categoryId") || key.includes("attributes[")) {
          params.delete(key)
        }
      }

      setFilterAtrributes([])

      tmp &&
        tmp
          .filter((item, pos) => {
            return tmp && tmp.indexOf(item) == pos
          })
          .forEach((item) => {
            item && params.append(`categoryId`, `${item}`)
          })
      push(pathname + "?" + params.toString())

      return tmp
    })
  }

  const removeAllFilters = () => {
    const params = new URLSearchParams(searchParams as any)
    const paramsKeys = params.keys()
    for (const key of paramsKeys) {
      if (key.includes("categoryId") || key.includes("attributes[")) {
        params.delete(key)
      }
    }

    setFilterAtrributes([])
    setCategoryIdsFilter(null)

    push(pathname + "?" + params.toString())
  }

  useEffect(() => {
    if (inView) {
      allProductsQuery.fetchNextPage()
      setLimit((limit) => limit + 5)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  if (!allProductsQuery.data) notFound()

  return (
    <>
      {isMobileView && (
        <>
          <div className="sticky top-0 z-50 border-b bg-alpha-white p">
            <div className="flex items-start gap-3">
              <MobileCategoriesFilter
                categoryId={selectedCategoryIds}
                brandId={brandId}
                sellerId={sellerId}
                categoryIdsFilter={categoryIdsFilter}
                onCategoryFilterChanged={({ status, value }) => {
                  onCategoryIdsFilterChanged({ status, value })
                  setCategoriesFilterVisibility(false)
                }}
              />
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
              {selectedCategoryIds &&
                selectedCategoryIds.length > 0 &&
                getFilterableAttributesQuery.data &&
                getFilterableAttributesQuery.data.filterableAttributes.filters
                  .length > 0 && (
                  <>
                    <Button
                      onClick={() => setFiltersVisibility(true)}
                      size="small"
                      variant="secondary"
                      className="rounded-full border border-alpha-200"
                    >
                      {filterAttributes.length > 0 && (
                        <span className="absolute -right-1 -top-1 block h-2.5 w-2.5 rounded-full bg-primary-500"></span>
                      )}
                      <LucideSlidersHorizontal className="icon text-alpha" />
                      فیلترها
                    </Button>
                    <MobileFilterableAttributes
                      filterAttributes={filterAttributes}
                      selectedCategoryId={selectedCategoryIds}
                      onFilterAttributesChanged={({ status, id, value }) => {
                        onFilterAttributesChanged({ status, id, value })
                        setFiltersVisibility(false)
                      }}
                      onRemoveAllFilters={() => {
                        removeAllFilters()
                        setFiltersVisibility(false)
                      }}
                    />
                  </>
                )}
              {!isMobileView && (
                <Button
                  onClick={() => setCategoriesFilterVisibility(true)}
                  size="small"
                  variant="secondary"
                  className="rounded-full border border-alpha-200"
                >
                  <LucideLayoutGrid className="icon text-alpha" />
                  دسته‌بندی‌ها
                </Button>
              )}
              <Button
                onClick={() => setSortFilterVisibility(true)}
                size="small"
                variant="secondary"
                className="rounded-full border border-alpha-200"
              >
                <LucideSortDesc className="icon text-alpha" />
                مرتب‌سازی
              </Button>
            </div>
          </div>
        </>
      )}

      <div
        className={clsx([
          "",
          isMobileView
            ? "bg-alpha-white"
            : "grid grid-cols-1 gap-5 md:grid-cols-[4fr_8fr] lg:grid-cols-[3fr_9fr]"
        ])}
      >
        {!isMobileView && (
          <div>
            <div className="rounded-md px-4">
              <div className="-mx-4 flex items-center p-4">
                <strong>فیلترها</strong>
                {filterAttributes.length > 0 && (
                  <Button
                    size="small"
                    noStyle
                    className="ms-auto text-sm text-red-500"
                    onClick={() => removeAllFilters()}
                  >
                    حذف همه فیلترها
                  </Button>
                )}
              </div>

              {selectedCategoryIds &&
                selectedCategoryIds.length === 1 &&
                !brandId &&
                !sellerId && (
                  <CategoryFilter selectedCategoryId={selectedCategoryIds[0]} />
                )}

              {brandId && (
                <BrandOrSellerCategoryFilter
                  categoryIdsFilter={categoryIdsFilter}
                  onCategoryIdsFilterChanged={onCategoryIdsFilterChanged}
                  brandId={brandId}
                />
              )}

              {sellerId && (
                <BrandOrSellerCategoryFilter
                  categoryIdsFilter={categoryIdsFilter}
                  onCategoryIdsFilterChanged={onCategoryIdsFilterChanged}
                  sellerId={sellerId}
                />
              )}

              {selectedCategoryIds &&
                selectedCategoryIds.length === 1 &&
                selectedCategoryIds[0] !== 0 && (
                  <FiltersContainer
                    selectedCategoryId={selectedCategoryIds[0]}
                    filterAttributes={filterAttributes}
                    onFilterAttributesChanged={onFilterAttributesChanged}
                  />
                )}

              {!selectedCategoryIds && !brandId && !sellerId && (
                <VocabularyFilter />
              )}
            </div>
          </div>
        )}
        <div>
          {!isMobileView && (
            <div className="flex items-center py-1 md:py-3">
              <ProductSort
                sort={sort}
                onSortChanged={(sort) => {
                  setSort(sort)
                  const params = new URLSearchParams(searchParams as any)
                  params.set("orderBy", `${sort}`)
                  push(pathname + "?" + params.toString())
                }}
              />
              {/* <ProductCount count={data.products.total || 0} /> */}
            </div>
          )}
          {allProductsQuery?.data?.pages.length > 0 ? (
            <>
              {allProductsQuery?.data?.pages.map((productPage) => (
                <>
                  <div>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
                      {productPage.products.data.map((product, idx) => (
                        <ProductCard key={idx} product={product as Product} />
                      ))}
                    </div>
                  </div>
                  {/* {isMobileView ? ( */}
                  {/* ) : (
                    productPage.products.lastPage &&
                    productPage.products.lastPage > 1 && (
                      <ProductPagination
                      total={productPage.products.lastPage}
                        currentPage={currentPage}
                        onChange={(page) => {
                          setCurrentPage(page)
                          const params = new URLSearchParams(
                            searchParams as any
                          )
                          params.set("page", `${page}`)
                          push(pathname + "?" + params.toString())
                        }}
                      />
                    )
                  )} */}
                </>
              ))}
              <div ref={ref} className="">
                <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
                  {[...Array(3)].map((loader) => (
                    <ProductCardLoader key={loader} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <NoProductFound />
          )}
          {/* <button
            disabled={allProductsQuery.isFetchingNextPage}
            onClick={() => allProductsQuery.fetchNextPage()}
          >
            Load More
          </button> */}
        </div>
      </div>
    </>
  )
}

export default ProductList
