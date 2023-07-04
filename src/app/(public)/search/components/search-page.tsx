"use client"

import { BreadcrumbList, Product, WithContext } from "schema-dts"

import Breadcrumb, { CrumbItemProps } from "@core/components/shared/Breadcrumb"
import CategoryFilter from "@/app/(public)/components/category-filter"
import ProductCount from "@/app/(public)/components/product-count"
import ProductList from "@/app/(public)/components/product-list"
import ProductSort from "@/app/(public)/components/product-sort"
import SearchHeader from "@/app/(public)/components/search-header"
import VocabularyFilter from "@/app/(public)/components/vocabulary-filter"

interface SearchPageProps {
  slug: Array<string | number>
}

const SearchPage = ({ slug }: SearchPageProps) => {
  const productsJsonLd: WithContext<Product>[] = [
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

  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": "https://vardast.com",
          name: "وردست"
        }
      }
    ]
  }

  const breadcrumb: CrumbItemProps[] = []

  return (
    <>
      <div className="mb-4">
        <Breadcrumb dynamic={false} items={breadcrumb} />
      </div>
      {slug && slug.length > 0 && (
        <div>
          <SearchHeader selectedCategoryId={+slug[0]} />
        </div>
      )}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[4fr_8fr] lg:grid-cols-[3fr_9fr]">
        <div className="hidden md:block">
          {slug && slug.length > 0 ? (
            <CategoryFilter selectedCategoryId={+slug[0]} />
          ) : (
            <VocabularyFilter />
          )}
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />
    </>
  )
}

export default SearchPage
