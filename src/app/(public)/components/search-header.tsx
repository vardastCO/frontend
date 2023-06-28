"use client"

import { useQuery } from "@tanstack/react-query"

import { Category } from "@/generated"

import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"

interface SearchHeaderProps {
  selectedCategory: string
}

const SearchHeader = ({ selectedCategory }: SearchHeaderProps) => {
  const { data } = useQuery<{ category: Category }>({
    queryKey: ["category"],
    queryFn: () => getCategoryQueryFn(selectedCategory)
  })

  return (
    <div className="mb-8">
      <h1 className="text-xl font-extrabold text-gray-800">
        {data?.category.title}
      </h1>
    </div>
  )
}

export default SearchHeader
