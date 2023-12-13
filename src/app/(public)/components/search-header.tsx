"use client"

import { notFound } from "next/navigation"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"
import { useQuery } from "@tanstack/react-query"
import { BreadcrumbList, ItemList, WithContext } from "schema-dts"

import { GetCategoryQuery } from "@/generated"

import Breadcrumb, { CrumbItemProps } from "@core/components/shared/Breadcrumb"
import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"

interface SearchHeaderProps {
  selectedCategoryId: number
}

const SearchHeader = ({ selectedCategoryId }: SearchHeaderProps) => {
  const { data } = useQuery<GetCategoryQuery>({
    queryKey: [
      QUERY_FUNCTIONS_KEY.CATEGORY_QUERY_KEY,
      { id: selectedCategoryId }
    ],
    queryFn: () => getCategoryQueryFn(selectedCategoryId)
  })

  if (!data) notFound()

  const breadcrumbJsonLdArray = []
  data.category.parentsChain.forEach((parent, idx) => {
    breadcrumbJsonLdArray.push({
      "@type": "ListItem",
      position: idx + 2,
      item: {
        "@id": encodeURI(
          `${process.env.NEXT_PUBLIC_URL}/products/${parent.id}/${parent.title}`
        ),
        name: parent.title
      }
    })
  })

  breadcrumbJsonLdArray.push({
    "@type": "ListItem",
    position: data.category.parentsChain.length + 2,
    item: {
      "@id": encodeURI(
        `${process.env.NEXT_PUBLIC_URL}/products/${data.category.id}/${data.category.title}`
      ),
      name: data.category.title
    }
  })

  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": process.env.NEXT_PUBLIC_URL as string,
          name: process.env.NEXT_PUBLIC_TITLE as string
        }
      },
      ...(breadcrumbJsonLdArray as ItemList[])
    ]
  }

  const breadcrumb: CrumbItemProps[] = []

  data.category.parentsChain.forEach((parent) => {
    breadcrumb.push({
      label: parent.title,
      path: `/products/${parent.id}/${parent.title}`,
      isCurrent: false
    })
  })

  breadcrumb.push({
    path: encodeURI(`/products/${data.category.id}/${data.category.title}`),
    label: `${data.category.title} (${digitsEnToFa(
      addCommas(data.category.productsCount)
    )} کالا)`,
    isCurrent: true
  })

  return (
    <>
      <div className="bg-alpha-white">
        <Breadcrumb dynamic={false} items={breadcrumb} />
      </div>
      {/* <div className="mb-8">
        <h1 className="text-xl font-extrabold text-alpha-800">
          {data.category.title}
        </h1>
      </div> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  )
}

export default SearchHeader
