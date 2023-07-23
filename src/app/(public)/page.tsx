import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import Search from "@/app/(public)/components/search"

import logoHorizontal from "@/assets/logo-horizontal-v1-persian-light-bg.svg"

export const metadata: Metadata = {
  title: "بازار آنلاین مصالح ساختمای",
  description: "وردست - بازار آنلاین مصالح ساختمانی"
}

const Index = async () => {
  const isMobileView = CheckIsMobileView()
  return (
    <div className="">
      <div className="container mx-auto px-4">
        <div className="mt-[32vh] flex flex-col items-center justify-center">
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
          <div className="mx-auto max-w-5xl">
            <div className="mt-24 grid grid-cols-4 gap-6">
              <div className="card rounded-md p-3">
                <Link href="/search">
                  <h2 className="text-sm font-semibold text-gray-800">
                    ماشین آلات و تجهیزات کارگاهی
                  </h2>
                </Link>
              </div>
              <div className="card rounded-md p-3">
                <Link href="/search">
                  <h2 className="text-sm font-semibold text-gray-800">
                    مصالح ساختمانی
                  </h2>
                </Link>
              </div>
              <div className="card rounded-md p-3">
                <Link href="/search">
                  <h2 className="text-sm font-semibold text-gray-800">
                    آهن آلات، سایر فلزات و سازه
                  </h2>
                </Link>
              </div>
              <div className="card rounded-md p-3">
                <Link href="/search">
                  <h2 className="text-sm font-semibold text-gray-800">
                    تاسیسات و لوازم بهداشتی
                  </h2>
                </Link>
              </div>
              <div className="card rounded-md p-3">
                <Link href="/search">
                  <h2 className="text-sm font-semibold text-gray-800">
                    گرمایش، سرمایش و تهویه مطبوع
                  </h2>
                </Link>
              </div>
              <div className="card rounded-md p-3">
                <Link href="/search">
                  <h2 className="text-sm font-semibold text-gray-800">
                    برق، الکترونیک و دیجیتال
                  </h2>
                </Link>
              </div>
              <div className="card rounded-md p-3">
                <Link href="/search">
                  <h2 className="text-sm font-semibold text-gray-800">
                    آسانسور و پله برقی
                  </h2>
                </Link>
              </div>
              <div className="card rounded-md p-3">
                <Link href="/search">
                  <h2 className="text-sm font-semibold text-gray-800">
                    درب و پنجره، پله، نرده و یراق
                  </h2>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Index
