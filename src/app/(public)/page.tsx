import { Metadata } from "next"
import Image from "next/image"

import Search from "@/app/(public)/components/search"

import logoHorizontal from "@/assets/logo-horizontal-v1-persian-light-bg.svg"

export const metadata: Metadata = {
  title: "بازار آنلاین مصالح ساختمای",
  description: "وردست - بازار آنلاین مصالح ساختمانی"
}

const Index = async () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full translate-y-[calc(-1*env(safe-area-inset-bottom))] flex-col items-center justify-center">
        <div className="relative mb-8 h-20">
          <Image
            src={logoHorizontal}
            alt={`${process.env.NEXT_PUBLIC_TITLE} - ${process.env.NEXT_PUBLIC_SLOGAN}`}
            className="h-20 w-auto object-contain"
            priority
          />
        </div>
        <Search />
      </div>

      <div>
        <div>
          <h2>ماشین آلات و تجهیزات کارگاهی</h2>
        </div>
        <div>
          <h2>مصالح ساختمانی</h2>
        </div>
        <div>
          <h2>آهن آلات، سایر فلزات و سازه</h2>
        </div>
        <div>
          <h2>ابزار آلات</h2>
        </div>
        <div>
          <h2>تاسیسات و لوازم بهداشتی</h2>
        </div>
        <div>
          <h2>گرمایش، سرمایش و تهویه مطبوع</h2>
        </div>
        <div>
          <h2>برق، الکترونیک و دیجیتال</h2>
        </div>
        <div>
          <h2>آسانسور و پله برقی</h2>
        </div>
        <div>
          <h2>نما و محوطه</h2>
        </div>
        <div>
          <h2>درب و پنجره، پله، نرده و یراق</h2>
        </div>
        <div>
          <h2>دکوراسیون داخلی و کابینت</h2>
        </div>
      </div>
    </div>
  )
}

export default Index
