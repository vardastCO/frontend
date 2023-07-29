"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"
import { LucideWarehouse } from "lucide-react"

import { GetAllBrandsQuery } from "@/generated"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import { getAllBrandsQueryFn } from "@core/queryFns/allBrandsQueryFns"

interface BrandsPageProps {
  isMobileView: RegExpMatchArray | null
}

const BrandsPage = ({ isMobileView }: BrandsPageProps) => {
  const { data, error } = useQuery<GetAllBrandsQuery>(
    ["brands"],
    () => getAllBrandsQueryFn(),
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
          items={[{ label: "برندهای وردست", path: "/brands", isCurrent: true }]}
        />
      </div>

      <div className="grid grid-cols-6 gap-6">
        {data.brands.data.map(
          (brand) =>
            brand && (
              <Link href={`/brand/${brand.id}`} key={brand.id}>
                <div className="relative flex h-28 w-28 items-center justify-center rounded-md border border-gray-200 bg-gray-50">
                  {brand.logoFile ? (
                    <Image
                      src={brand.logoFile.presignedUrl.url as string}
                      alt={brand.name as string}
                      fill
                      className="object-contain p-3"
                    />
                  ) : (
                    <LucideWarehouse
                      className="h-8 w-8 text-gray-400 md:h-10 md:w-10"
                      strokeWidth={1.5}
                    />
                  )}
                </div>
                <div className="mt-2">
                  <h2>{brand.name}</h2>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  )
}

export default BrandsPage
