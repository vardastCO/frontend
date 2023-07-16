"use client"

import { notFound } from "next/navigation"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Product as ProductSchema, WithContext } from "schema-dts"

import { GetAllProductsQuery, IndexProductInput, Product } from "@/generated"

import { Button } from "@core/components/ui/button"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import ProductCount from "@/app/(public)/components/product-count"
import ProductSort from "@/app/(public)/components/product-sort"

import ProductCard from "./product-card"

interface ProductListProps {
  selectedCategoryId?: number
}

const ProductList = ({ selectedCategoryId }: ProductListProps) => {
  const args: IndexProductInput = { page: 1 }
  if (selectedCategoryId) args["categoryId"] = selectedCategoryId
  const { data, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery<GetAllProductsQuery>(
      ["products", args],
      ({ pageParam = 1 }) =>
        getAllProductsQueryFn({ ...args, page: pageParam }),
      {
        getNextPageParam: (lastPage, pages) => {
          return lastPage.products.currentPage + 1 > lastPage.products.lastPage
            ? undefined
            : lastPage.products.currentPage + 1
        }
      }
    )

  if (!data) notFound()
  if (!data.pages[0].products.data.length) return <>کالایی ثبت نشده</>

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
        <ProductCount count={data.pages.at(0).products.total || 0} />
      </div>
      <div>
        {data.pages.map((page, idx) => (
          <div
            key={idx}
            className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4"
          >
            {page.products.data.map((product, idx) => (
              <ProductCard key={idx} product={product as Product} />
            ))}
          </div>
        ))}
        {hasNextPage ? "asdf" : "ssss"}
        <Button onClick={() => fetchNextPage()}>NN</Button>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />
    </>
  )
}

export default ProductList
