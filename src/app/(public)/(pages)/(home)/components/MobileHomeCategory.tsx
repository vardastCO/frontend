"use client"

import { Category } from "@/generated"

import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"
import CategorySegment from "@/app/(public)/(pages)/categories/components/CategorySegment"

const MobileHomeCategory = ({ categories }: { categories?: Category[] }) => {
  return (
    <MobileHomeSection bgWhite block title="دسته‌بندی‌ها">
      <CategorySegment categories={categories} />
    </MobileHomeSection>
  )
}

export default MobileHomeCategory
