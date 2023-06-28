import Link from "next/link"

import { Category } from "@/generated"

interface CategoryFilterItemProps {
  category: Category
}

const CategoryFilterItem = ({ category }: CategoryFilterItemProps) => {
  return (
    <div className="flex items-center gap-1.5">
      <Link
        href={`/search/${category.slug}`}
        className="py-2 text-gray-700 hover:text-brand-500"
      >
        {category.title}
      </Link>
    </div>
  )
}

export default CategoryFilterItem
