"use client"

import { useState } from "react"
import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { GetAllSellersQuery, IndexSellerInput, Seller } from "@/generated"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import { getAllSellersQueryFn } from "@core/queryFns/allSellersQueryFns"
import BrandOrSellerCard from "@/app/(public)/components/BrandOrSellerCard"
import BrandsOrSellersContainer from "@/app/(public)/components/BrandsOrSellersContainer"
import ProductPagination from "@/app/(public)/components/product-pagination"

interface SellersPageProps {
  isMobileView: boolean
  args: IndexSellerInput
}

const SellersPage = ({ args }: SellersPageProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(args.page || 1)

  const { data } = useQuery<GetAllSellersQuery>(
    [
      "sellers",
      {
        ...args,
        page: currentPage
      }
    ],
    () =>
      getAllSellersQueryFn({
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
      <div className="bg-alpha-white">
        <Breadcrumb
          dynamic={false}
          items={[
            { label: "فروشندگان وردست", path: "/sellers", isCurrent: true }
          ]}
        />
      </div>

      <BrandsOrSellersContainer>
        {data.sellers.data.map(
          (seller) =>
            seller && (
              <BrandOrSellerCard
                key={seller.id}
                content={{ ...(seller as Seller), __typename: "Seller" }}
              />
            )
        )}
      </BrandsOrSellersContainer>
      {data.sellers.lastPage && data.sellers.lastPage > 1 && (
        <ProductPagination
          total={data.sellers.lastPage}
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

export default SellersPage
