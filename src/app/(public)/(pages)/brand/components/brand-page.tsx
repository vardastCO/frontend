"use client"

import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"

import { Brand, GetBrandQuery, IndexProductInput } from "@/generated"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import { getBrandQueryFn } from "@core/queryFns/brandQueryFns"
import BrandHeader from "@/app/(public)/(pages)/brand/components/brand-header"
import ProductList from "@/app/(public)/components/product-list"

interface BrandPageProps {
  isMobileView: RegExpMatchArray | null
  slug: Array<string | number>
  args: IndexProductInput
}

const BrandPage = ({ isMobileView, args, slug }: BrandPageProps) => {
  const { data, error } = useQuery<GetBrandQuery>(
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
            { label: "برندهای وردست", path: "/brands", isCurrent: false },
            {
              label: data.brand.name,
              path: `/brand/${data.brand.id}/${data.brand.name}`,
              isCurrent: true
            }
          ]}
        />
      </div>

      <BrandHeader brand={data.brand as Brand} />

      <ProductList
        args={args}
        isMobileView={isMobileView}
        selectedCategoryId={args["categoryId"] || 0}
        brandId={+slug[0]}
      />
    </div>
  )
}

export default BrandPage
