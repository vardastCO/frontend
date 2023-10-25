"use client"

import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
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
