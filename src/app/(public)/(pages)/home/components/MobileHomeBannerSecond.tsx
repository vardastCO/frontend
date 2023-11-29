import MobileHomeImage from "@/app/(public)/(pages)/home/components/MobileHomeImage"
import MobileHomeSection from "@/app/(public)/(pages)/home/components/MobileHomeSection"

const _images = [
  {
    url: "/images/5.2.png",
    id: "0"
  }
]

const MobileHomeBannerSecond = () => {
  return (
    <MobileHomeSection height="THIRTY_FOUR">
      <MobileHomeImage images={_images} />
    </MobileHomeSection>
  )
}

export default MobileHomeBannerSecond
