"use client"

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
      <div className="mb-8">
        <h1 className="text-xl font-extrabold text-gray-800">
          {data?.category.title}
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
