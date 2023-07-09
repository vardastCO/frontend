"use client"

import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Product as ProductSchema, WithContext } from "schema-dts"

import { Product } from "@/generated"

import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import ProductCount from "@/app/(public)/components/product-count"
import ProductSort from "@/app/(public)/components/product-sort"

import ProductCard from "./product-card"

interface ProductListProps {
  selectedCategoryId?: number
}

const ProductList = ({ selectedCategoryId }: ProductListProps) => {
  const args = selectedCategoryId ? { categoryId: selectedCategoryId } : {}
  const { data, error } = useQuery<{ products: Product[] }>({
    queryKey: ["products", args],
    queryFn: () => getAllProductsQueryFn(args)
  })

  if (!data) notFound()
  if (!data.products.length) return <>کالایی ثبت نشده</>

  const productsJsonLd: WithContext<ProductSchema>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      category: "",
      image: "",
      url: "",
      name: "",
      description: "",
      offers: {
        "@type": "Offer",
        priceCurrency: "IRR",
        price: ""
      }
    }
  ]

  return (
    <>
      <div className="flex items-center border-b border-gray-200 py-1 md:py-3">
        <ProductSort />
        <ProductCount count={data?.products.length || 0} />
      </div>
      <div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
          {data?.products.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />
    </>
  )
}

export default ProductList
