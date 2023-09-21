"use client"

import { IndexProductInput } from "@/generated"

import ProductList from "@/app/(public)/components/product-list"
import SearchHeader from "@/app/(public)/components/search-header"

interface SearchPageProps {
  isMobileView: boolean
  slug: Array<string | number>
  args: IndexProductInput
}

const SearchPage = ({ isMobileView, slug, args }: SearchPageProps) => {
  const selectedCategoryId = slug && slug.length > 0 ? +slug[0] : 0

  return (
    <>
      {slug && slug.length > 0 && (
        <SearchHeader selectedCategoryId={+slug[0]} />
      )}
      <div className="px-6 py">
        <ProductList
          isMobileView={isMobileView}
          args={args}
          selectedCategoryIds={selectedCategoryId ? [selectedCategoryId] : null}
        />
      </div>
    </>
  )
}

export default SearchPage
