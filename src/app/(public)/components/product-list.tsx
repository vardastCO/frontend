"use client"

import { useState } from "react"
import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import {
  FilterAttribute,
  GetAllProductsQuery,
  IndexProductInput,
  Product,
  ProductSortablesEnum
} from "@/generated"

import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import NoProductFound from "@/app/(public)/components/no-product-found"
import ProductCount from "@/app/(public)/components/product-count"
import ProductPagination from "@/app/(public)/components/product-pagination"
import ProductSort from "@/app/(public)/components/product-sort"

import ProductCard from "./product-card"

interface ProductListProps {
  args: IndexProductInput
  filterAttributes?: FilterAttribute[]
}

const ProductList = ({ args, filterAttributes }: ProductListProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()!
  const { push } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(args.page || 1)
  const [sort, setSort] = useState<ProductSortablesEnum>(
    args.orderBy || ProductSortablesEnum.Newest
  )

  const { data, error } = useQuery<GetAllProductsQuery>(
    [
      "products",
      {
        ...args,
        page: currentPage,
        attributes: filterAttributes,
        orderBy: sort
      }
    ],
    () =>
      getAllProductsQueryFn({
        ...args,
        page: currentPage,
        attributes: filterAttributes,
        orderBy: sort
      }),
    {
      keepPreviousData: true
    }
  )

  if (!data) notFound()
  if (!data.products.data.length) return <NoProductFound />

  return (
    <>
      <div className="flex items-center border-b border-gray-200 py-1 md:py-3">
        <ProductSort
          sort={sort}
          onSortChanged={(sort) => {
            setSort(sort)
            const params = new URLSearchParams(searchParams as any)
            params.set("orderBy", `${sort}`)
            push(pathname + "?" + params.toString())
          }}
        />
        <ProductCount count={data.products.total || 0} />
      </div>
      <div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
          {data.products.data.map((product, idx) => (
            <ProductCard key={idx} product={product as Product} />
          ))}
        </div>
        {data.products.lastPage && data.products.lastPage > 1 && (
          <ProductPagination
            total={data.products.lastPage}
            currentPage={currentPage}
            onChange={(page) => {
              setCurrentPage(page)
              const params = new URLSearchParams(searchParams as any)
              params.set("page", `${page}`)
              push(pathname + "?" + params.toString())
            }}
          />
        )}
      </div>
    </>
  )
}

export default ProductList
