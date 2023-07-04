"use client"

import { useQuery } from "@tanstack/react-query"

import { Product } from "@/generated"

import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import ProductCount from "@/app/(public)/components/product-count"
import ProductSort from "@/app/(public)/components/product-sort"

import ProductCard from "./product-card"

const ProductList = () => {
  const { data } = useQuery<{ products: Product[] }>({
    queryKey: ["products"],
    queryFn: getAllProductsQueryFn
  })
  return (
    <>
      <div className="flex items-center border-b border-gray-200 py-3">
        <ProductSort />
        <ProductCount />
      </div>
      <div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
          {data?.products.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}

export default ProductList
