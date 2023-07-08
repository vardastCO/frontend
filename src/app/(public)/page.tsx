import { Metadata } from "next"
import Image from "next/image"

import Search from "@/app/(public)/components/search"

import logoHorizontal from "@/assets/logo-horizontal-v1-persian-light-bg.svg"

export const metadata: Metadata = {
  title: "وردست - بازار آنلاین مصالح ساختمای",
  description: "وردست - بازار آنلاین مصالح ساختمانی"
}

const Index = async () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="relative mb-8 h-20">
        <Image
          src={logoHorizontal}
          alt={`${process.env.NEXT_PUBLIC_TITLE} - ${process.env.NEXT_PUBLIC_SLOGAN}`}
          loading="lazy"
          className="h-20 w-auto object-contain"
        />
      </div>
      <Search />
    </div>
  )
}

export default Index
