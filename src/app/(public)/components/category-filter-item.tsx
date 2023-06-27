import Link from "next/link"

import { Category } from "@/generated"

interface CategoryFilterItemProps {
  category: Category
}

const CategoryFilterItem = ({ category }: CategoryFilterItemProps) => {
  //   const hasChild = category.items && category.items.length > 0
  return (
    <li>
      <div className="flex items-center gap-1.5">
        {/* {hasChild && <IconChevronDown className="h-4 w-4 text-gray-400" />} */}
        <Link
          href={`/search/${category.slug}`}
          className="py-2 text-gray-700 hover:text-brand-500"
        >
          {category.title}
        </Link>
      </div>
      {/* {hasChild && (
        <ol className="ms-6 flex flex-col gap-2">
          {category.items.map((child, idx) => (
            <CategoryFilterItem category={child} key={idx} />
          ))}
        </ol>
      )} */}
    </li>
  )
}

export default CategoryFilterItem
