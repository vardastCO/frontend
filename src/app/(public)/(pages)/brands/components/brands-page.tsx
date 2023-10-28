"use client"

import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import useTranslation from "next-translate/useTranslation"

import { Brand, GetAllBrandsQuery } from "@/generated"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import { getAllBrandsQueryFn } from "@core/queryFns/allBrandsQueryFns"
import BrandCard from "@/app/(public)/components/brand-card"

interface BrandsPageProps {
  isMobileView: boolean
}

const BrandsPage = (_: BrandsPageProps) => {
  const { t } = useTranslation()
  const { data } = useQuery<GetAllBrandsQuery>(
    ["brands"],
    () => getAllBrandsQueryFn(),
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
            {
              label: t("common:producer_vardast"),
              path: "/brands",
              isCurrent: true
            }
          ]}
        />
      </div>

      <div className="mt grid gap-y pb-5 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
        {data.brands.data.map(
          (brand) =>
            brand && <BrandCard key={brand.id} brand={brand as Brand} />
        )}
      </div>
    </>
  )
}

export default BrandsPage
