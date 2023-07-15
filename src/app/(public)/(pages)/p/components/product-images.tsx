"use client"

import { useState } from "react"
import Image from "next/image"
import { Navigation, Pagination, Thumbs } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { Image as ProductImage } from "@/generated"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/thumbs"

interface ProductImagesProps {
  isMobileView: RegExpMatchArray | null
  images: ProductImage[]
}

const ProductImages = ({ images, isMobileView }: ProductImagesProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <div className="overflow-hidden">
      <div className="overflow-hidden">
        <Swiper
          dir="rtl"
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          navigation={true}
          pagination={isMobileView ? true : false}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Pagination, Navigation, Thumbs]}
        >
          {images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-96">
                <Image
                  src={image.file.presignedUrl.url}
                  alt={image.file.name}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {!isMobileView && (
        <div className="overflow-hidden">
          <Swiper
            //   @ts-ignore
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
          >
            {images.map((image, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative h-20 w-20">
                  <Image
                    src={image.file.presignedUrl.url}
                    alt={image.file.name}
                    fill
                    sizes="10vw"
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  )
}
// const ProductImages = ({ images }: ProductImagesProps) => {
//   return (
//     <Tabs.Root orientation="vertical" defaultValue={`${images.at(0)?.id}`}>
//       {images.map((image, idx) => (
//         <Tabs.Content key={image.id} value={`${image.id}`}>
//           <div className="relative h-96">
//             <Image
//               src={image.file.presignedUrl.url}
//               alt={image.file.name}
//               fill
//               priority={idx === 0}
//               sizes="(max-width: 640px) 100vw, 33vw"
//               className="object-contain"
//             />
//           </div>
//         </Tabs.Content>
//       ))}

//       <Tabs.List
//         aria-label="tabs example"
//         className="flex items-center justify-center gap-2"
//       >
//         {images.map((image, idx) => (
//           <Tabs.Trigger
//             key={image.id}
//             value={`${image.id}`}
//             asChild
//             className="overflow-hidden rounded border border-transparent bg-gray-50 text-gray-300 data-[state='active']:text-brand-600 md:p-1 md:data-[state='active']:border-brand-600"
//           >
//             <div>
//               <div className="h-2 w-2 rounded-full bg-current md:hidden md:bg-gray-300"></div>
//               <div className="relative hidden h-20 w-20 md:block">
//                 <Image
//                   src={image.file.presignedUrl.url}
//                   alt={image.file.name}
//                   fill
//                   sizes="10vw"
//                   className="object-contain"
//                 />
//               </div>
//             </div>
//           </Tabs.Trigger>
//         ))}
//       </Tabs.List>
//     </Tabs.Root>
//   )
// }

export default ProductImages
