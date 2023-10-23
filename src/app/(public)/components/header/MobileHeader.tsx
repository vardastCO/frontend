"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { BookmarkIcon } from "@heroicons/react/24/outline"
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid"
import { ArrowRight } from "lucide-react"

import { Button } from "@core/components/ui/button"

export interface IModalHeader {
  title?: string
  shareIcon?: {}
  hasBack?: {
    onClick?: (_?: any) => void
    hidden?: boolean
  }
}

const MobileHeader: React.FC<IModalHeader> = ({
  title,
  hasBack,
  shareIcon
}) => {
  const { back } = useRouter()
  const pathname = usePathname()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const checkIfFavorite = () => {
      const prevItems = localStorage.getItem("favorites")
      const product = pathname.split("/")[2]

      if (prevItems) {
        if (JSON.parse(prevItems).find((prev: string) => prev === product)) {
          return true
        }
      }
    }
    setIsFavorite(!!checkIfFavorite())
  }, [pathname])

  return (
    <div
      id="mobile-header-navbar"
      className="fixed left-0 right-0 top-0 z-40 w-full border-b border-alpha-200 bg-alpha-white"
    >
      <div className="grid h-14 grid-cols-12 items-center">
        <div className="col-span-2 ml-auto">
          {hasBack && (
            <Button
              className={hasBack && hasBack.hidden ? "hidden" : ""}
              id="header-back-button"
              variant={"ghost"}
              onClick={() => (hasBack.onClick ? hasBack.onClick() : back())}
              iconOnly
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
          )}
        </div>
        <div className="col-span-8">
          {
            title && (
              <h3 className="text-center font-bold text-alpha-800">{title}</h3>
            )
            // : (
            //   <Image
            //     src={"/images/logo.png"}
            //     alt={"vardast"}
            //     width={24}
            //     height={24}
            //     className="mx-auto"
            //   />
            // )
          }
        </div>
        <div className="col-span-2 mr-auto">
          {shareIcon && (
            <Button
              id="header-back-button"
              variant={"ghost"}
              iconOnly
              onClick={() => {
                const prevItems = localStorage.getItem("favorites")
                const product = pathname.split("/")[2]

                if (prevItems) {
                  if (
                    JSON.parse(prevItems).find(
                      (prev: string) => prev === product
                    )
                  ) {
                    const newItems = JSON.parse(prevItems).filter(
                      (prev: string) => prev !== product
                    )
                    localStorage.setItem("favorites", JSON.stringify(newItems))
                    setIsFavorite(false)
                  } else {
                    const newItems = [...JSON.parse(prevItems)]
                    newItems.push(pathname.split("/")[2])
                    localStorage.setItem("favorites", JSON.stringify(newItems))
                    setIsFavorite(true)
                  }
                } else {
                  localStorage.setItem(
                    "favorites",
                    JSON.stringify([pathname.split("/")[2]])
                  )
                  setIsFavorite(true)
                }
              }}
            >
              {isFavorite ? (
                <SolidBookmarkIcon className="h-6 w-6" />
              ) : (
                <BookmarkIcon className="h-6 w-6 text-alpha" />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileHeader
