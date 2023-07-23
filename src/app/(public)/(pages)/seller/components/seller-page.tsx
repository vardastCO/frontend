"use client"

import { useContext, useState } from "react"
import Image from "next/image"
import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation"
import { CheckedState } from "@radix-ui/react-checkbox"
import {
  IconAdjustmentsHorizontal,
  IconBuildingWarehouse,
  IconCategory,
  IconInfoSquareRounded,
  IconMapPin,
  IconSortDescending2
} from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"
import { useSetAtom } from "jotai"

import {
  FilterAttribute,
  GetSellerQuery,
  IndexProductInput,
  useGetAllFilterableAttributesBasicsQuery
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Breadcrumb from "@core/components/shared/Breadcrumb"
import { Button } from "@core/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@core/components/ui/dialog"
import { getSellerQueryFn } from "@core/queryFns/sellerQueryFns"
import FiltersContainer from "@/app/(public)/components/filters-container"
import MobileFilterableAttributes from "@/app/(public)/components/mobile-filters"
import ProductList from "@/app/(public)/components/product-list"
import { PublicContext } from "@/app/(public)/components/public-provider"

interface SellerPageProps {
  isMobileView: RegExpMatchArray | null
  slug: Array<string | number>
  args: IndexProductInput
}

const SellerPage = ({ isMobileView, args, slug }: SellerPageProps) => {
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

  const { data, error } = useQuery<GetSellerQuery>(
    ["seller", { id: +slug[0] }],
    () => getSellerQueryFn(+slug[0]),
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
                  <IconAdjustmentsHorizontal className="icon text-gray-400" />
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
            <IconCategory className="icon text-gray-400" />
            دسته‌بندی‌ها
          </Button>
          <Button
            onClick={() => setSortFilterVisibility(true)}
            size="small"
            variant="ghost"
            className="border border-gray-200"
          >
            <IconSortDescending2 className="icon text-gray-400" />
            مرتب‌سازی
          </Button>
        </div>
      )}
      <div>
        <Breadcrumb
          dynamic={false}
          items={[
            { label: "فروشندگان وردست", path: "/sellers", isCurrent: false },
            {
              label: data.seller.name,
              path: `/seller/${data.seller.id}/${data.seller.name}`,
              isCurrent: true
            }
          ]}
        />
      </div>
      <div className="mb-12 flex items-end gap-6">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-200 bg-gray-50 md:h-28 md:w-28">
          {data.seller.logoFile?.presignedUrl.url ? (
            <Image
              src={data.seller.logoFile?.presignedUrl.url}
              fill
              alt={data.seller.name}
              className="object-contain p-3"
            />
          ) : (
            <IconBuildingWarehouse
              className="h-8 w-8 text-gray-400 md:h-10 md:w-10"
              stroke={1.5}
            />
          )}
        </div>
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-base font-bold text-gray-800 md:text-xl">
            {data.seller.name}
          </h1>
          <div className="flex items-center gap-2 md:gap-6">
            {data.seller.addresses && data.seller.addresses.length > 0 && (
              <div className="flex items-center gap-1 text-gray-500">
                <IconMapPin className="h-4 w-4 text-gray-400" stroke={1.5} />
                {data.seller.addresses.at(0)?.city.name}
              </div>
            )}

            {/* TODO */}
            {/* <div className="flex items-center gap-1">
              <span className="text-gray-500">عملکرد</span>
              <span className="font-bold text-emerald-500">عالی</span>
            </div> */}
          </div>
        </div>
        {data.seller.bio && (
          <div className="mr-auto">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" size="small">
                  <IconInfoSquareRounded className="icon" />
                  جزئیات
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>اطلاعات تکمیلی فروشنده</DialogTitle>
                </DialogHeader>
                <div>
                  <h3 className="mb-2 font-bold text-gray-800">
                    معرفی فروشنده
                  </h3>
                  <div className="leading-relaxed text-gray-700">
                    {data.seller.bio}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
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
                sellerId={+slug[0]}
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

export default SellerPage
