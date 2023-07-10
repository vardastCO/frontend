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
    <div className="flex h-screen w-full items-center justify-center">
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
    </div>
  )
}

export default Index
