"use client"

import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"
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

      {/* <BrandHeader brand={data.brand as Brand} /> */}

      <ProductList
        args={args}
        isMobileView={isMobileView}
        selectedCategoryIds={args["categoryIds"] || undefined}
        brandId={+slug[0]}
      />
    </div>
  )
}

export default BrandPage
