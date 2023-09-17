"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"
import { LucideWarehouse } from "lucide-react"

import { GetAllSellersQuery } from "@/generated"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import { getAllSellersQueryFn } from "@core/queryFns/allSellersQueryFns"

interface SellersPageProps {
  isMobileView: boolean
}

const SellersPage = ({ isMobileView }: SellersPageProps) => {
  const { data } = useQuery<GetAllSellersQuery>(
    ["sellers"],
    () => getAllSellersQueryFn(),
    {
      keepPreviousData: true
    }
  )

  if (!data) notFound()

  return (
    <div
      className={clsx([
        "container mx-auto px-4",
        isMobileView ? "" : "pt-1 md:py-8"
      ])}
    >
      <div>
        <Breadcrumb
          dynamic={false}
          items={[
            { label: "فروشندگان وردست", path: "/sellers", isCurrent: true }
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-6">
        {data.sellers.data.map(
          (seller) =>
            seller && (
              <Link
                href={`/seller/${seller.id}`}
                key={seller.id}
                prefetch={false}
              >
                <div>
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-md border border-alpha-200 bg-alpha-50 md:h-28 md:w-28">
                    {seller.logoFile ? (
                      <Image
                        src={seller.logoFile.presignedUrl.url as string}
                        alt={seller.name as string}
                        fill
                        className="object-contain p-3"
                      />
                    ) : (
                      <LucideWarehouse
                        className="h-8 w-8 text-alpha-400 md:h-10 md:w-10"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>
                  <h2>{seller.name}</h2>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  )
}

export default SellersPage
