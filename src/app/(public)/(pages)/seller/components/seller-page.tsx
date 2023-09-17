"use client"

import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"

import { GetSellerQuery, IndexProductInput, Seller } from "@/generated"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import { getSellerQueryFn } from "@core/queryFns/sellerQueryFns"
import SellerHeader from "@/app/(public)/(pages)/seller/components/seller-header"
import ProductList from "@/app/(public)/components/product-list"

interface SellerPageProps {
  isMobileView: boolean
  slug: Array<string | number>
  args: IndexProductInput
}

const SellerPage = ({ isMobileView, args, slug }: SellerPageProps) => {
  const { data } = useQuery<GetSellerQuery>(
    ["seller", { id: +slug[0] }],
    () => getSellerQueryFn(+slug[0]),
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
            { label: "فروشندگان وردست", path: "/sellers", isCurrent: false },
            {
              label: data.seller.name,
              path: `/seller/${data.seller.id}/${data.seller.name}`,
              isCurrent: true
            }
          ]}
        />
      </div>

      <SellerHeader seller={data.seller as Seller} />

      <ProductList
        args={args}
        isMobileView={isMobileView}
        selectedCategoryIds={args["categoryIds"] || undefined}
        sellerId={+slug[0]}
      />
    </div>
  )
}

export default SellerPage
