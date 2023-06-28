import { Metadata, ResolvingMetadata } from "next"
import { dehydrate } from "@tanstack/react-query"
import { BreadcrumbList, Product, WithContext } from "schema-dts"

import getQueryClient from "@core/clients/getQueryClient"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"

import CategoryFilter from "../../components/category-filter"
import ProductCount from "../../components/product-count"
import ProductList from "../../components/product-list"
import ProductSort from "../../components/product-sort"
import SearchHeader from "../../components/search-header"

type SearchSlugProps = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: SearchSlugProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug
  const category = await getCategoryQueryFn(slug)

  return {
    title: category.category.title
  }
}

const SearchSlug = async ({ params: { slug } }: SearchSlugProps) => {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["category"], () => getCategoryQueryFn(slug))
  const dehydratedState = dehydrate(queryClient)

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

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <div>
        <SearchHeader selectedCategory={slug} />
      </div>
      <div className="grid grid-cols-[3fr_9fr] gap-5">
        <div>
          <CategoryFilter selectedCategory={slug} />
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
    </ReactQueryHydrate>
  )
}

export default SearchSlug
