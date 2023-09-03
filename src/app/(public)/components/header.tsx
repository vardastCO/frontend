"use client"

import Image from "next/image"
import Link from "next/link"
import clsx from "clsx"

import logoHorizontal from "@/assets/logo-horizontal-v1-persian-light-bg.svg"
import logoSign from "@/assets/sign.svg"

import Search from "./search"

interface HeaderProps {
  isMobileView: RegExpMatchArray | null
}

const Header = ({ isMobileView }: HeaderProps) => {
  return (
    <div
      className={clsx([
        "flex flex-col gap-4 border-gray-200 bg-white p-4 lg:border-b",
        isMobileView ? "md:pb-4" : "pb-0"
      ])}
    >
      <div className="flex items-center gap-4 lg:gap-8">
        <Link href="/" prefetch={false}>
          <div className="relative h-8 lg:h-12">
            <Image
              src={logoHorizontal}
              alt={`${process.env.NEXT_PUBLIC_TITLE} - ${process.env.NEXT_PUBLIC_SLOGAN}`}
              loading="lazy"
              className="hidden h-12 w-auto object-contain lg:block"
            />
            <Image
              src={logoSign}
              alt={`${process.env.NEXT_PUBLIC_TITLE} - ${process.env.NEXT_PUBLIC_SLOGAN}`}
              loading="lazy"
              className="h-8 w-auto object-contain lg:hidden"
            />
          </div>
        </Link>
        <div className="flex-1">
          <Search isMobileView={isMobileView} />
        </div>
      </div>
      {!isMobileView && (
        <div className="flex items-start justify-between">
          {/* <Navigation /> */}
          {/* <LocationSelector /> */}
        </div>
      )}
    </div>
  )
}

export default Header
