"use client"

import { Category } from "@/generated"

import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"
import CategorySegment from "@/app/(public)/(pages)/category/components/CategorySegment"

const MobileHomeCategory = ({
  categories,
  width
}: {
  width: number
  categories?: Category[]
}) => {
  return (
    <MobileHomeSection bgWhite block title="دسته‌بندی‌ها">
      <CategorySegment categories={categories} width={width} />
    </MobileHomeSection>
  )
}

export default MobileHomeCategory
