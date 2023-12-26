"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import clsx from "clsx"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"

import Link from "@core/components/shared/Link"
import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"
import { ICategoryListLoader } from "@/app/(public)/(pages)/categories/components/CategoryListLoader"

const _sliders = [
  {
    id: 0,
    url: "https://blog.vardast.com/2023/12/06/%d8%a7%d9%86%d9%88%d8%a7%d8%b9-%d9%84%d9%88%d9%84%d9%87-%d9%88-%d8%a7%d8%aa%d8%b5%d8%a7%d9%84%d8%a7%d8%aa/",
    image: "/images/blogs/0.png",
    title: "انواع لوله و اتصالات",
    description:
      "لوله‌ها و اتصالات در سیستم‌های آبرسانی و فاضلاب ساختمان‌ها نقش بسیار مهمی دارند. از آن‌جا که هر نوع لوله خصوصیات و کاربردهای خاص خود را دارد، باید براساس نیاز و کاربرد مورد نظر از لوله مناسب استفاده شود."
  },
  {
    id: 1,
    url: "https://blog.vardast.com/2023/12/11/%d8%a2%d8%b4%d9%86%d8%a7%db%8c%db%8c-%d8%a8%d8%a7-%d8%a8%d8%aa%d9%86-%d8%b3%d8%a7%d8%ae%d8%aa%d9%85%d8%a7%d9%86%db%8c/",
    image: "/images/blogs/1.jpg",
    title: "بتن ساختمانی",
    description:
      "بتن به عنوان یکی از مهمترین مصالح ساختمانی، نقش کلیدی در ساخت و سازهای مدرن ایفا می‌کند. در این مقاله به بررسی ویژگی‌ها، عیارها و مقاومت‌های مختلف بتن"
  },
  {
    id: 2,
    url: "https://blog.vardast.com/2023/12/11/%DA%A9%D8%A7%D8%B1%D8%A8%D8%B1%D8%AF-%D8%B4%D9%86-%D9%88-%D9%85%D8%A7%D8%B3%D9%87-%D8%AF%D8%B1-%D8%B5%D9%86%D8%B9%D8%AA-%D8%B3%D8%A7%D8%AE%D8%AA%D9%85%D8%A7%D9%86//",
    image: "/images/blogs/2.jpg",
    title: "شن و ماسه",
    description:
      "شن و ماسه از مواد اصلی در صنعت ساخت‌و‌ساز هستند و در تهیه بتن، ملات، دوغاب و سایر مصالح ساختمانی کاربرد دارند. سنگدانه‌ها یکی از مؤلفه‌های اصلی بتن هستند و"
  },
  {
    id: 3,
    url: "https://blog.vardast.com/2023/12/11/%d9%be%d9%88%da%a9%d9%87-%d8%b3%d8%a7%d8%ae%d8%aa%d9%85%d8%a7%d9%86%db%8c/",
    image: "/images/blogs/3.png",
    title: "پوکه ساختمانی",
    description:
      "پوکه یک ماده پُرکننده است که در صنایع مختلف مورد استفاده قرار می‌گیرد، به ویژه در صنعت ساختمان. پوکه به دو نوع معدنی و صنعتی تقسیم می‌شود"
  },
  {
    id: 4,
    url: "https://blog.vardast.com/2023/12/11/%da%af%da%86-%d9%88-%d8%ae%d8%a7%da%a9-%d8%af%d8%b1-%d8%b3%d8%a7%d8%ae%d8%aa%d9%85%d8%a7%d9%86/",
    image: "/images/blogs/4.jpg",
    title: "گچ و خاک در ساختمان",
    description:
      "گچ و خاک دو ماده هستند که در صنعت ساختمانی و چندین زمینه دیگر استفاده می‌شوند. در ادامه، به بررسی خصوصیات و کاربردهای هر یک می‌پردازیم"
  }
]

const MobileHomeTopBlogs = () => {
  const [selectedItemId, setSelectedItemId] =
    useState<ICategoryListLoader>(null)
  const sliderRef = useRef<SwiperRef>(null)
  const [slideWidth, setSlideHeight] = useState(0)

  useEffect(() => {
    const slide = sliderRef.current?.swiper.slides[0]
    if (sliderRef.current) {
      setSlideHeight((slide as any)?.swiperSlideSize)
    }
  }, [])

  return (
    <MobileHomeSection
      viewAllHref={`https://blog.vardast.com/`}
      bgWhite
      title="جدیدترین مطالب"
      block
    >
      <div className="overflow-hidden">
        <Swiper
          ref={sliderRef}
          slidesPerView={1.1}
          spaceBetween={8}
          centeredSlides
          className="h-full w-full pb-12"
        >
          {_sliders?.map(({ id, url, image, title, description }) => (
            <SwiperSlide
              key={id}
              className={clsx(
                "overflow-hidden rounded-2xl border bg-alpha-white shadow-lg",
                selectedItemId === id
                  ? "border-2 border-primary"
                  : "border-alpha-50"
              )}
            >
              <Link
                onClick={() => {
                  setSelectedItemId(id)
                }}
                // target="_blank"
                style={{
                  width: slideWidth
                }}
                className={clsx("h-full")}
                href={url}
              >
                <div
                  style={{
                    height: (slideWidth * 9) / 16
                  }}
                  className="relative"
                >
                  <Image
                    src={image}
                    alt="category"
                    fill
                    className="h-full object-fill"
                  />
                </div>
                <div className="relative z-20 flex flex-col items-start justify-between gap-y-2 bg-alpha-50 bg-opacity-60 px py-4 text-center">
                  <h4 className="w-full truncate text-justify font-semibold">
                    {title}
                  </h4>
                  <p className="w-full truncate text-justify text-sm">
                    {description}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </MobileHomeSection>
  )
}

export default MobileHomeTopBlogs
