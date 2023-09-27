"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

import { Button } from "@core/components/ui/button"

export interface IModalHeader {
  title?: string
  hasBack?: {
    onClick?: (_?: any) => void
    hidden?: boolean
  }
}

const MobileHeader: React.FC<IModalHeader> = ({ title, hasBack }) => {
  const { back } = useRouter()
  return (
    <div className="sticky top-0 z-40 border-b border-alpha-200 bg-alpha-white">
      <div className="grid h-16 grid-cols-12 items-center">
        <div>
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
        {title ? (
          <h3 className="col-span-10 text-center font-bold text-alpha-800">
            {title}
          </h3>
        ) : (
          <div className="col-span-10">
            <Image
              src={"/images/logo.png"}
              alt={"vardast"}
              width={24}
              height={24}
              className="mx-auto"
            />
          </div>
        )}
        <div></div>
      </div>
    </div>
  )
}

export default MobileHeader
