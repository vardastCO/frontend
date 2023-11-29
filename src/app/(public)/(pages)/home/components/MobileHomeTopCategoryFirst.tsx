"use client"

import MobileHomeImage from "@/app/(public)/(pages)/home/components/MobileHomeImage"
import MobileHomeSection from "@/app/(public)/(pages)/home/components/MobileHomeSection"

type Props = {}

const _images = [
  {
    url: "/images/1.1.png",
    id: "0"
  },
  {
    url: "/images/1.1.png",
    id: "1"
  },
  {
    url: "/images/1.1.png",
    id: "2"
  },
  {
    url: "/images/1.1.png",
    id: "3"
  }
]

const MobileHomeTopCategoryFirst = (_: Props) => {
  return (
    <MobileHomeSection
      height="EIGHTY_EIGHT"
      itemsCount="TWO"
      title="ابزار آلات"
    >
      <MobileHomeImage images={_images} />
    </MobileHomeSection>
  )
}

export default MobileHomeTopCategoryFirst
