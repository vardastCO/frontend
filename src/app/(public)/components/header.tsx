import Image from "next/image"
import Link from "next/link"

import logoHorizontal from "@/assets/logo-horizontal-v1-persian-light-bg.svg"
import logoSign from "@/assets/sign.svg"

import LocationSelector from "./location-selector"
import Navigation from "./navigation"
import Search from "./search"

const Header = () => {
  return (
    <div className="flex flex-col gap-4 border-gray-200 bg-white p-4 pb-0 lg:border-b">
      <div className="flex items-center gap-4 lg:gap-8">
        <Link href="/">
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
          <Search />
        </div>
      </div>
      <div className="hidden items-start justify-between lg:flex">
        <Navigation />
        <LocationSelector />
      </div>
    </div>
  )
}

export default Header
