"use client"

import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { Brand, GetBrandQuery, IndexProductInput } from "@/generated"

import { getBrandQueryFn } from "@core/queryFns/brandQueryFns"
import BrandHeader from "@/app/(public)/(pages)/brand/components/brand-header"
import ProductList from "@/app/(public)/components/product-list"

interface BrandPageProps {
  isMobileView: RegExpMatchArray | null
  slug: Array<string | number>
  args: IndexProductInput
}

const BrandPage = ({ args, slug }: BrandPageProps) => {
  const { data, error } = useQuery<GetBrandQuery>(
    ["brand", { id: +slug[0] }],
    () => getBrandQueryFn(+slug[0]),
    {
      keepPreviousData: true
    }
  )

  if (!data) notFound()

  return (
    <div className="container mx-auto px-4 py-4 lg:py-8">
      <BrandHeader brand={data.brand as Brand} />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-[4fr_8fr] lg:grid-cols-[3fr_9fr]">
        <div className="hidden md:block"></div>
        <div>
          <ProductList args={args} />
        </div>
      </div>
    </div>
  )
}

export default BrandPage
