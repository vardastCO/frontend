import Image from "next/image"

const MobileHomeImage = ({
  images
}: {
  images: { url: string; id: string }[]
}) => {
  return (
    <>
      {images.map(({ url, id }) => (
        <div key={id} className="relative h-full w-full">
          <Image
            src={url}
            alt="slider"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      ))}
    </>
  )
}

export default MobileHomeImage
