import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import FrontPageHeader from "@/app/(public)/components/front-page-header"
import Search from "@/app/(public)/components/search"

import logoHorizontal from "@/assets/logo-horizontal-v1-persian-light-bg.svg"

export const metadata: Metadata = {
  title: "بازار آنلاین مصالح ساختمانی",
  description: "وردست - بازار آنلاین مصالح ساختمانی"
}

const Index = async () => {
  const isMobileView = CheckIsMobileView()
  return (
    <div className="">
      <div className="container mx-auto px-4">
        {!isMobileView && <FrontPageHeader />}
        <div className="mt-[30vh] flex flex-col items-center justify-center">
          <div className="relative mb-8 h-20">
            <Image
              src={logoHorizontal}
              alt={`${process.env.NEXT_PUBLIC_TITLE} - ${process.env.NEXT_PUBLIC_SLOGAN}`}
              className="h-20 w-auto object-contain"
              priority
            />
          </div>
          <Search isMobileView={isMobileView} />
        </div>
        {!isMobileView && (
          <div className="fixed inset-x-0 bottom-0 mx-auto mb-12 flex w-full justify-center gap-4 text-center text-sm text-gray-500">
            <Link href="/about">درباره وردست</Link>
            <Link href="/contact">تماس با ما</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Index