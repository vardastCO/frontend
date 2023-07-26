"use client"

import { useContext } from "react"
import Link from "next/link"
import { useAtom } from "jotai"
import { LucideLayoutGrid, LucideSearch, LucideUserCircle } from "lucide-react"

import { Button } from "@core/components/ui/button"
import { PublicContext } from "@/app/(public)/components/public-provider"

type Props = {}

const MobileNavigation = (props: Props) => {
  const { globalCategoriesFilterVisibilityAtom } = useContext(PublicContext)
  const [
    globalCategoriesFilterVisibility,
    setGlobalCategoriesFilterVisibility
  ] = useAtom(globalCategoriesFilterVisibilityAtom)
  return (
    <div>
      <div
        className="h-[calc(64px+env(safe-area-inset-bottom))]"
        aria-hidden="true"
      ></div>
      <div className="fixed bottom-0 left-0 z-50 h-[calc(64px+env(safe-area-inset-bottom))] w-full border-t border-gray-200 bg-white bg-opacity-50 backdrop-blur-xl dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto grid h-full max-w-lg grid-cols-3 pb-[env(safe-area-inset-bottom)] font-medium">
          <Link
            href="/search"
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <LucideSearch className="mb-2 h-5 w-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500" />
            <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
              جستجو
            </span>
          </Link>
          <Button
            noStyle
            onClick={() =>
              setGlobalCategoriesFilterVisibility(
                !globalCategoriesFilterVisibility
              )
            }
            type="button"
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <LucideLayoutGrid className="mb-2 h-5 w-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500" />
            <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
              دسته‌بندی‌ها
            </span>
          </Button>
          <Link
            href="/admin"
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <LucideUserCircle className="mb-2 h-5 w-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500" />
            <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
              وردست من
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MobileNavigation
