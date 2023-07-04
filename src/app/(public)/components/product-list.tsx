"use client"

import { useQuery } from "@tanstack/react-query"

import { Product } from "@/generated"

import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"

import ProductCard from "./product-card"

const ProductList = () => {
  const { data } = useQuery<{ products: Product[] }>({
    queryKey: ["products"],
    queryFn: getAllProductsQueryFn
  })
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
      {data?.products.map((product, idx) => (
        <ProductCard key={idx} product={product} />
      ))}
    </div>
  )
}

export default ProductList
