"use client"

import { useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import {
  IconAdjustmentsHorizontal,
  IconCategory,
  IconSortDescending2
} from "@tabler/icons-react"
import { useSetAtom } from "jotai"

import { useGetAllFilterableAttributesBasicsQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/ui/button"
import MobileFilterableAttributes from "@/app/(public)/components/mobile-filters"
import { PublicContext } from "@/app/(public)/components/public-provider"

import logoHorizontal from "@/assets/logo-horizontal-v1-persian-light-bg.svg"
import logoSign from "@/assets/sign.svg"

import Navigation from "./navigation"
import Search from "./search"

interface HeaderProps {
  isMobileView: RegExpMatchArray | null
}

const Header = ({ isMobileView }: HeaderProps) => {
  const pathname = usePathname()
  const { slug } = useParams()
  const {
    categoriesFilterVisibilityAtom,
    sortFilterVisibilityAtom,
    filtersVisibilityAtom
  } = useContext(PublicContext)
  const setCategoriesFilterVisibility = useSetAtom(
    categoriesFilterVisibilityAtom
  )
  const setSortFilterVisibility = useSetAtom(sortFilterVisibilityAtom)
  const setFiltersVisibility = useSetAtom(filtersVisibilityAtom)

  const isCategoryPage = pathname.startsWith("/search")
  const selectedCategory = isCategoryPage && slug && slug[0] ? +slug[0] : 0
  const getFilterableAttributesQuery = useGetAllFilterableAttributesBasicsQuery(
    graphqlRequestClient,
    {
      filterableAttributesInput: {
        categoryId: selectedCategory
      }
    },
    {
      enabled: !!selectedCategory
    }
  )

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
      {!isMobileView ? (
        <div className="flex items-start justify-between">
          <Navigation />
          {/* <LocationSelector /> */}
        </div>
      ) : (
        <div className="flex items-start gap-2">
          {selectedCategory !== 0 &&
            getFilterableAttributesQuery.data &&
            getFilterableAttributesQuery.data.filterableAttributes.filters
              .length > 0 && (
              <>
                <Button
                  onClick={() => setFiltersVisibility(true)}
                  size="small"
                  variant="ghost"
                  className="border border-gray-200"
                >
                  <IconAdjustmentsHorizontal className="icon text-gray-400" />
                  فیلترها
                </Button>
                <MobileFilterableAttributes />
              </>
            )}
          <Button
            onClick={() => setCategoriesFilterVisibility(true)}
            size="small"
            variant="ghost"
            className="border border-gray-200"
          >
            <IconCategory className="icon text-gray-400" />
            دسته‌بندی‌ها
          </Button>
          <Button
            onClick={() => setSortFilterVisibility(true)}
            size="small"
            variant="ghost"
            className="border border-gray-200"
          >
            <IconSortDescending2 className="icon text-gray-400" />
            مرتب‌سازی
          </Button>
        </div>
      )}
    </div>
  )
}

export default Header
