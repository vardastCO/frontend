import MobileHomeImage from "@/app/(public)/(pages)/home/components/MobileHomeImage"
import MobileHomeSection from "@/app/(public)/(pages)/home/components/MobileHomeSection"

const _images = [
  {
    url: "/images/1.1.png",
    id: "0"
  },
  {
    url: "/images/1.1.png",
    id: "1"
  }
]

const MobileHomeBanner = () => {
  return (
    <MobileHomeSection height="FORTY_THREE" itemsCount="TWO">
      <MobileHomeImage images={_images} />
    </MobileHomeSection>
  )
}

export default MobileHomeBanner
