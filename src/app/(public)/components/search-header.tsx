"use client"

import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { BreadcrumbList, WithContext } from "schema-dts"

import { Category } from "@/generated"

import Breadcrumb, { CrumbItemProps } from "@core/components/shared/Breadcrumb"
import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"

interface SearchHeaderProps {
  selectedCategoryId: number
}

const SearchHeader = ({ selectedCategoryId }: SearchHeaderProps) => {
  const { data } = useQuery<{ category: Category }>({
    queryKey: ["category", { id: selectedCategoryId }],
    queryFn: () => getCategoryQueryFn(selectedCategoryId)
  })

  if (!data) notFound()

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
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": encodeURI(
            `${process.env.NEXT_PUBLIC_URL}/search/${data.category.id}/${data.category.title}`
          ),
          name: data.category.title
        }
      }
    ]
  }

  const breadcrumb: CrumbItemProps[] = [
    {
      path: encodeURI(`/search/${data.category.id}/${data.category.title}`),
      label: data.category.title,
      isCurrent: true
    }
  ]

  return (
    <>
      <div className="mb-4">
        <Breadcrumb dynamic={false} items={breadcrumb} />
      </div>
      <div className="mb-8">
        <h1 className="text-xl font-extrabold text-gray-800">
          {data.category.title}
        </h1>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  )
}

export default SearchHeader
