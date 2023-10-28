"use client"

import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { GetAllSellersQuery, Seller } from "@/generated"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import { getAllSellersQueryFn } from "@core/queryFns/allSellersQueryFns"
import SellerCard from "@/app/(public)/components/seller-card"

interface SellersPageProps {
  isMobileView: boolean
}

const SellersPage = (_: SellersPageProps) => {
  const { data } = useQuery<GetAllSellersQuery>(
    ["sellers"],
    () => getAllSellersQueryFn(),
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

      <div className="mt grid gap-y pb-5 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
        {data.sellers.data.map(
          (seller) =>
            seller && <SellerCard key={seller.id} seller={seller as Seller} />
        )}
      </div>
    </>
  )
}

export default SellersPage
