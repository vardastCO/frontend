import { dehydrate } from "@tanstack/react-query"

import getQueryClient from "@core/clients/getQueryClient"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"

import CategoryFilter from "../../components/category-filter"
import ProductCount from "../../components/product-count"
import ProductList from "../../components/product-list"
import ProductSort from "../../components/product-sort"

const Search = async ({ params: { slug } }: { params: { slug: string } }) => {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["category"], () => getCategoryQueryFn(slug))
  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <div className="grid grid-cols-[3fr_9fr] gap-5">
        <div>
          <CategoryFilter selectedCategory="slug" />
        </div>
        <div>
          <div className="flex items-center border-b border-gray-200 py-3">
            <ProductSort />
            <ProductCount />
          </div>
          <div>
            <ProductList />
          </div>
        </div>
      </div>
    </ReactQueryHydrate>
  )
}

export default Search
