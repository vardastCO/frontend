"use client"

import Image from "next/image"
import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { LucideWarehouse } from "lucide-react"
import useTranslation from "next-translate/useTranslation"

import { GetBrandQuery, IndexProductInput } from "@/generated"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import { getBrandQueryFn } from "@core/queryFns/brandQueryFns"
// import BrandHeader from "@/app/(public)/(pages)/brand/components/primary-header"
import ProductList from "@/app/(public)/components/product-list"

interface BrandPageProps {
  isMobileView: boolean
  slug: Array<string | number>
  args: IndexProductInput
}

const BrandPage = ({ isMobileView, args, slug }: BrandPageProps) => {
  const { t } = useTranslation()
  const { data } = useQuery<GetBrandQuery>(
    ["brand", { id: +slug[0] }],
    () => getBrandQueryFn(+slug[0]),
    {
      keepPreviousData: true
    }
  )

  if (!data) notFound()

  return (
    <>
      <>{/* <BrandHeader brand={data.brand as Brand} /> */}</>
      <div className="bg-alpha-white">
        <Breadcrumb
          dynamic={false}
          items={[
            {
              label: t("common:producer_vardast"),
              path: "/brands",
              isCurrent: false
            },
            {
              label: data.brand.name,
              path: `/brand/${data.brand.id}/${data.brand.name}`,
              isCurrent: true
            }
          ]}
        />
      </div>

      <div className="flex flex-col items-center justify-center md:mb-12 md:flex-row md:items-end md:justify-start md:gap-6">
        <div className="relative flex h-16 w-full items-center justify-center rounded-md border border-alpha-200 bg-alpha-50 md:h-28 md:w-28">
          {data.brand.logoFile ? (
            <Image
              src={data.brand.logoFile.presignedUrl.url}
              fill
              alt={data.brand.name}
              className="object-contain p-3"
            />
          ) : (
            <LucideWarehouse
              className="h-8 w-8 text-alpha-400 md:h-10 md:w-10"
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>
      <ProductList
        args={args}
        isMobileView={isMobileView}
        selectedCategoryIds={args["categoryIds"] || undefined}
        brandId={+slug[0]}
      />
    </>
  )
}

export default BrandPage
