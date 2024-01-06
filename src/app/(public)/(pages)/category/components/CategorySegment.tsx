"use client"

import { Category } from "@/generated"

import CategoryCircleItem from "@/app/(public)/(pages)/category/components/CategoryCircleItem"

const CategorySegment = ({
  categories,
  width
}: {
  categories?: Category[]
  width: number
}) => {
  return (
    <div className="overflow-hidden">
      <div className="hide-scrollbar inline-flex h-full w-full overflow-x-auto pb-7 pr-7">
        {categories?.map((props) => (
          <CategoryCircleItem key={props.id} width={width} data={props} />
        ))}
      </div>
    </div>
  )
}

export default CategorySegment
