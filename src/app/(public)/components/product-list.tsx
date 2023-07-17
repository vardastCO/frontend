"use client"

import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { GetAllProductsQuery, IndexProductInput, Product } from "@/generated"

import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import NoProductFound from "@/app/(public)/components/no-product-found"
import ProductCount from "@/app/(public)/components/product-count"
import ProductPagination from "@/app/(public)/components/product-pagination"
import ProductSort from "@/app/(public)/components/product-sort"

import ProductCard from "./product-card"

interface ProductListProps {
  args?: IndexProductInput
}

const ProductList = ({ args }: ProductListProps) => {
  const { data, error } = useQuery<GetAllProductsQuery>(
    ["products", args],
    () => getAllProductsQueryFn(args),
    {
      keepPreviousData: true
    }
  )

  if (!data) notFound()
  if (!data.products.data.length) return <NoProductFound />

  return (
    <>
      <div className="flex items-center border-b border-gray-200 py-1 md:py-3">
        <ProductSort />
        <ProductCount count={data.products.total || 0} />
      </div>
      <div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
          {data.products.data.map((product, idx) => (
            <ProductCard key={idx} product={product as Product} />
          ))}
        </div>
        {data.products.lastPage && data.products.lastPage > 1 && (
          <ProductPagination total={data.products.lastPage} />
        )}
      </div>
    </>
  )
}

export default ProductList
