"use client"

import { useState } from "react"
import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import useTranslation from "next-translate/useTranslation"

import { Brand, GetAllBrandsQuery, IndexBrandInput } from "@/generated"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import { getAllBrandsQueryFn } from "@core/queryFns/allBrandsQueryFns"
import BrandOrSellerCard from "@/app/(public)/components/BrandOrSellerCard"
import BrandsOrSellersContainer from "@/app/(public)/components/BrandsOrSellersContainer"
import ProductPagination from "@/app/(public)/components/product-pagination"

interface BrandsPageProps {
  isMobileView: boolean
  args: IndexBrandInput
}

const BrandsPage = ({ args }: BrandsPageProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(args.page || 1)
  const { t } = useTranslation()
  const { data } = useQuery<GetAllBrandsQuery>(
    [
      "brands",
      {
        ...args,
        page: currentPage
      }
    ],
    () =>
      getAllBrandsQueryFn({
        ...args,
        page: currentPage
      }),
    {
      keepPreviousData: true
    }
  )

  if (!data) notFound()

  return (
    <>
      <div className="border-b bg-alpha-white">
        <Breadcrumb
          dynamic={false}
          items={[
            {
              label: t("common:producer_vardast"),
              path: "/brands",
              isCurrent: true
            }
          ]}
        />
      </div>

      <BrandsOrSellersContainer>
        {data.brands.data.map(
          (brand) =>
            brand && (
              <BrandOrSellerCard
                key={brand.id}
                content={{ ...(brand as Brand), __typename: "Brand" }}
              />
            )
        )}
      </BrandsOrSellersContainer>
      {data.brands.lastPage && data.brands.lastPage > 1 && (
        <ProductPagination
          total={data.brands.lastPage}
          currentPage={currentPage}
          onChange={(page) => {
            setCurrentPage(page)
            const params = new URLSearchParams(searchParams as any)
            params.set("page", `${page}`)
            push(pathname + "?" + params.toString())
          }}
        />
      )}
    </>
  )
}

export default BrandsPage
