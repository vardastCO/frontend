"use client"

import { useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import { useMediaQuery } from "@mantine/hooks"
import {
  IconAdjustmentsHorizontal,
  IconCategory,
  IconSortDescending2
} from "@tabler/icons-react"
import { useAtom } from "jotai"

import { Button } from "@core/components/ui/button"
import { PublicContext } from "@/app/(public)/components/public-provider"

import logoHorizontal from "@/assets/logo-horizontal-v1-persian-light-bg.svg"
import logoSign from "@/assets/sign.svg"

import LocationSelector from "./location-selector"
import Navigation from "./navigation"
import Search from "./search"

const Header = () => {
  const { categoriesFilterStateAtom } = useContext(PublicContext)
  const [categoriesFilterState, setCategoriesFilterState] = useAtom(
    categoriesFilterStateAtom
  )
  const isTabletOrMobile = useMediaQuery("(max-width: 640px)", true, {
    getInitialValueInEffect: false
  })
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
      {isTabletOrMobile ? (
        <div className="flex items-start gap-2">
          <Button
            size="small"
            variant="ghost"
            className="border border-gray-200"
          >
            <IconAdjustmentsHorizontal className="icon text-gray-400" />
            فیلترها
          </Button>
          <Button
            onClick={() => setCategoriesFilterState(true)}
            size="small"
            variant="ghost"
            className="border border-gray-200"
          >
            <IconCategory className="icon text-gray-400" />
            دسته‌بندی‌ها
          </Button>
          <Button
            size="small"
            variant="ghost"
            className="border border-gray-200"
          >
            <IconSortDescending2 className="icon text-gray-400" />
            مرتب‌سازی
          </Button>
        </div>
      ) : (
        <div className="flex items-start justify-between">
          <Navigation />
          <LocationSelector />
        </div>
      )}
    </div>
  )
}

export default Header
