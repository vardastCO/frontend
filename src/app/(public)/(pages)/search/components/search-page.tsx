"use client"

import { IndexProductInput } from "@/generated"

import CategoryFilter from "@/app/(public)/components/category-filter"
import FiltersContainer from "@/app/(public)/components/filters-container"
import ProductList from "@/app/(public)/components/product-list"
import SearchHeader from "@/app/(public)/components/search-header"
import VocabularyFilter from "@/app/(public)/components/vocabulary-filter"

interface SearchPageProps {
  isMobileView: RegExpMatchArray | null
  slug: Array<string | number>
  args: IndexProductInput
}

const SearchPage = ({ isMobileView, slug, args }: SearchPageProps) => {
  return (
    <>
      {slug && slug.length > 0 && (
        <div>
          <SearchHeader selectedCategoryId={+slug[0]} />
        </div>
      )}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[4fr_8fr] lg:grid-cols-[3fr_9fr]">
        {!isMobileView && (
          <div>
            <div className="divide-y rounded-md border border-gray-300 px-4">
              {slug && slug.length > 0 ? (
                <>
                  <CategoryFilter selectedCategoryId={+slug[0]} />
                  <FiltersContainer selectedCategoryId={+slug[0]} />
                </>
              ) : (
                <VocabularyFilter />
              )}
            </div>
          </div>
        )}

        <div>
          <ProductList args={args} />
        </div>
      </div>
    </>
  )
}

export default SearchPage
