"use client"

import { useMediaQuery } from "@mantine/hooks"

import CategoryFilter from "@/app/(public)/components/category-filter"
import ProductList from "@/app/(public)/components/product-list"
import SearchHeader from "@/app/(public)/components/search-header"
import VocabularyFilter from "@/app/(public)/components/vocabulary-filter"

interface SearchPageProps {
  slug: Array<string | number>
}

const SearchPage = ({ slug }: SearchPageProps) => {
  const isTabletOrMobile = useMediaQuery("(max-width: 640px)", true, {
    getInitialValueInEffect: false
  })
  return (
    <>
      {slug && slug.length > 0 && (
        <div>
          <SearchHeader selectedCategoryId={+slug[0]} />
        </div>
      )}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[4fr_8fr] lg:grid-cols-[3fr_9fr]">
        {!isTabletOrMobile && (
          <div>
            {slug && slug.length > 0 ? (
              <CategoryFilter selectedCategoryId={+slug[0]} />
            ) : (
              <VocabularyFilter />
            )}
          </div>
        )}

        <div>
          <ProductList
            selectedCategoryId={slug && slug.length ? +slug[0] : undefined}
          />
        </div>
      </div>
    </>
  )
}

export default SearchPage
