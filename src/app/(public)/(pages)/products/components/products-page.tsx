"use client"

import { IndexProductInput } from "@/generated"

import ProductList from "@/app/(public)/components/product-list"
import ProductsHeader from "@/app/(public)/components/search-header"

interface ProductsPageProps {
  isMobileView: boolean
  slug: Array<string | number>
  args: IndexProductInput
}

const ProductsPage = ({ isMobileView, slug, args }: ProductsPageProps) => {
  const selectedCategoryId = slug && slug.length > 0 ? +slug[0] : 0

  return (
    <>
      {slug && slug.length > 0 && (
        <ProductsHeader selectedCategoryId={+slug[0]} />
      )}
      <ProductList
        isMobileView={isMobileView}
        args={args}
        selectedCategoryIds={selectedCategoryId ? [selectedCategoryId] : null}
        limitPage={selectedCategoryId ? undefined : 5}
      />
    </>
  )
}

export default ProductsPage
