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
import { useSetAtom } from "jotai"
import { LucideSlidersHorizontal, LucideSortDesc } from "lucide-react"

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
import DesktopMobileViewOrganizer from "@/app/(public)/components/DesktopMobileViewOrganizer"
import FiltersContainer from "@/app/(public)/components/filters-container"
import InfiniteScrollPagination from "@/app/(public)/components/InfiniteScrollPagination"
import MobileCategoriesFilter from "@/app/(public)/components/mobile-categories-filter"
import MobileFilterableAttributes from "@/app/(public)/components/mobile-filterable-attributes"
import MobileSortFilter from "@/app/(public)/components/mobile-sort-filter"
import ProductCard, {
  ProductCardSkeleton
} from "@/app/(public)/components/product-card"
import ProductListContainer, {
  ProductContainerType
} from "@/app/(public)/components/ProductListContainer"
import { PublicContext } from "@/app/(public)/components/public-provider"
import VocabularyFilter from "@/app/(public)/components/vocabulary-filter"

interface ProductListProps {
  isMobileView: boolean
  args: IndexProductInput
  selectedCategoryIds: InputMaybe<number[]> | undefined
  brandId?: number
  sellerId?: number
  hasFilter?: boolean
  limitPage?: number
  setCategoriesCount?: (_?: any) => void
  containerType?: ProductContainerType
}

export const checkLimitPageByCondition = (condition: boolean, result: any[]) =>
  condition ? result.length + 1 : undefined

const ProductList = ({
  isMobileView,
  args,
  selectedCategoryIds,
  brandId,
  sellerId,
  setCategoriesCount,
  limitPage,
  hasFilter = true,
  containerType = ProductContainerType.LARGE_LIST
}: ProductListProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { push } = useRouter()

  const [sort, setSort] = useState<ProductSortablesEnum>(
    args.orderBy || ProductSortablesEnum.Newest
  )
  const [filterAttributes, setFilterAttributes] = useState<FilterAttribute[]>(
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
        page: args.page || 1,
        attributes: filterAttributes,
        orderBy: sort
      }
    ],
    ({ pageParam = 1 }) => {
      return getAllProductsQueryFn({
        ...args,
        page: pageParam,
        attributes: filterAttributes,
        orderBy: sort
      })
    },
    {
      keepPreviousData: true,
      getNextPageParam(lastPage, allPages) {
        return limitPage
          ? checkLimitPageByCondition(
              lastPage.products.currentPage <= limitPage,
              allPages
            )
          : checkLimitPageByCondition(
              lastPage.products.currentPage < lastPage.products.lastPage,
              allPages
            )
      }
    }
  )

  useEffect(() => {
    if (setCategoriesCount) {
      setCategoriesCount &&
        setCategoriesCount(allProductsQuery.data?.pages[0].products.total)
    }
  }, [allProductsQuery.data?.pages, setCategoriesCount])

  const onFilterAttributesChanged = ({
    status,
    id,
    value
  }: FilterAttribute & { status: CheckedState }) => {
    setFilterAttributes((values) => {
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

      setFilterAttributes([])

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

    setFilterAttributes([])
    setCategoryIdsFilter(null)

    push(pathname + "?" + params.toString())
  }

  if (!allProductsQuery.data) notFound()

  const DesktopSidebar = (
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

      {!selectedCategoryIds && !brandId && !sellerId && <VocabularyFilter />}
    </div>
  )

  // const DesktopHeader = (
  //   <div className="flex items-center py-1 md:py-3">
  //     <ProductSort
  //       sort={sort}
  //       onSortChanged={(sort) => {
  //         setSort(sort)
  //         const params = new URLSearchParams(searchParams as any)
  //         params.set("orderBy", `${sort}`)
  //         push(pathname + "?" + params.toString())
  //       }}
  //     />
  //   </div>
  // )

  const MobileHeader = (
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
        {/* 
        dont use this part of code
        <Button
          onClick={() => setCategoriesFilterVisibility(true)}
          size="small"
          variant="secondary"
          className="rounded-full border border-alpha-200"
        >
          <LucideLayoutGrid className="icon text-alpha" />
          دسته‌بندی‌ها
        </Button> */}
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
  )

  const Content = (
    <ProductListContainer type={containerType}>
      {({ selectedItemId, setSelectedItemId }) => (
        <InfiniteScrollPagination
          CardLoader={() => (
            <ProductCardSkeleton containerType={containerType} />
          )}
          infiniteQuery={allProductsQuery}
        >
          {(page, ref) => (
            <>
              {page.products.data.map((product, index) => (
                <ProductCard
                  selectedItemId={selectedItemId}
                  setSelectedItemId={setSelectedItemId}
                  containerType={containerType}
                  ref={
                    page.products.data.length - 1 === index ? ref : undefined
                  }
                  key={product?.id}
                  product={product as Product}
                />
              ))}
            </>
          )}
        </InfiniteScrollPagination>
      )}
    </ProductListContainer>
  )

  return (
    <DesktopMobileViewOrganizer
      isMobileView={isMobileView}
      DesktopSidebar={DesktopSidebar}
      // DesktopHeader={DesktopHeader}
      DesktopHeader={<></>}
      MobileHeader={hasFilter ? MobileHeader : <></>}
      Content={Content}
    />
  )
}

export default ProductList
