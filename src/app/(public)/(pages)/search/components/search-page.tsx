"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { FilterAttribute, IndexProductInput } from "@/generated"

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
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { push, replace } = useRouter()
  const [filterAttributes, setFilterAtrributes] = useState<FilterAttribute[]>(
    []
  )

  useEffect(() => {
    const params = new URLSearchParams()
    filterAttributes.forEach((attribute) => {
      params.set(`attribute[${attribute.id}]`, attribute.value)
    })
    push(pathname + "?" + params.toString())
  }, [filterAttributes, pathname, push, searchParams])

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
            <div className="divide-y divide-gray-200 rounded-md border border-gray-300 px-4">
              {slug && slug.length > 0 ? (
                <>
                  <CategoryFilter selectedCategoryId={+slug[0]} />
                  <FiltersContainer
                    selectedCategoryId={+slug[0]}
                    onFilterAttributesChanged={({ status, id, value }) => {
                      setFilterAtrributes((values) => {
                        let tmp = values
                        if (status === true) {
                          tmp = [
                            ...tmp,
                            {
                              id,
                              value
                            }
                          ]
                        } else if (status === false) {
                          tmp = tmp.filter(
                            (item) => item.id !== id && item.value !== value
                          )
                        }
                        return tmp
                      })
                    }}
                  />
                </>
              ) : (
                <VocabularyFilter />
              )}
            </div>
          </div>
        )}

        <div>
          <ProductList args={args} filterAttributes={filterAttributes} />
        </div>
      </div>
    </>
  )
}

export default SearchPage
