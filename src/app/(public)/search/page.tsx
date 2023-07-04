import { dehydrate } from "@tanstack/react-query"

import getQueryClient from "@core/clients/getQueryClient"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"

import ProductCount from "../components/product-count"
import ProductList from "../components/product-list"
import ProductSort from "../components/product-sort"
import VocabularyFilter from "../components/vocabulary-filter"

const Search = async () => {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["vocabulary"], getVocabularyQueryFn)
  await queryClient.prefetchQuery(["products"], getAllProductsQueryFn)
  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[4fr_8fr] lg:grid-cols-[3fr_9fr]">
        <div className="hidden md:block">
          <VocabularyFilter />
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
