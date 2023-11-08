"use client"

import { Category } from "@/generated"

import Link from "@core/components/shared/Link"

interface CategoryFilterItemProps {
  category: Category
}

const CategoryFilterItem = ({ category }: CategoryFilterItemProps) => {
  return (
    <div className="flex items-center gap-1.5">
      <Link
        href={encodeURI(`/search/${category.id}/${category.title}`)}
        className="py-2 text-alpha-700 hover:text-primary-500"
        prefetch={false}
      >
        {category.title}
      </Link>
    </div>
  )
}

export default CategoryFilterItem
