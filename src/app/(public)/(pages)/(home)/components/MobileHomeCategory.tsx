"use client"

import { Category } from "@/generated"

import Segment from "@core/components/ui/segment"
import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"

const MobileHomeCategory = ({ categories }: { categories: Category[] }) => {
  return (
    <MobileHomeSection block title="دسته بندی ها">
      <Segment segments={categories} />
    </MobileHomeSection>
  )
}

export default MobileHomeCategory
