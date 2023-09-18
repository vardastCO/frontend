"use client"

import { LucideAlignRight } from "lucide-react"

import useIsCurrentPath from "@core/hooks/useIsCurrentPath"

import Search from "../search"
import VerticalSpace from "./VerticalSpace"

interface MobileSearchBarProps {
  isMobileView: boolean
}

export const MobileSearchBar: React.FC<MobileSearchBarProps> = ({
  isMobileView
}) => {
  const isCurrentPath = useIsCurrentPath(["", "profile"])

  if (isCurrentPath) {
    return null
  }

  return (
    <>
      <VerticalSpace numberOfSpaces={2} />
      <div className="fixed bottom-0 left-0 z-50 flex h-[calc(128px+env(safe-area-inset-bottom))] w-full flex-col gap-4 border-t border-alpha-200 bg-alpha-100 p-4 dark:border-alpha-600 dark:bg-alpha-700">
        <div className="flex items-center gap-4 lg:gap-8">
          <LucideAlignRight />
          <div className="flex-1">
            <Search isMobileView={isMobileView} />
          </div>
        </div>
      </div>
    </>
  )
}
