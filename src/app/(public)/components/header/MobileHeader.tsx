"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

import { Button } from "@core/components/ui/button"

export interface IModalHeader {
  title: string
  hasBack?: {
    onClick?: (_?: any) => void
    hidden?: boolean
  }
}

const MobileHeader: React.FC<IModalHeader> = ({ title, hasBack }) => {
  const { back } = useRouter()
  return (
    <div className="sticky top-0 z-40 border-b border-alpha-200 bg-alpha-100">
      <div className="grid h-5xl grid-cols-12 items-center">
        <div>
          {hasBack && (
            <Button
              className={hasBack && hasBack.hidden ? "hidden" : ""}
              id="header-back-button"
              variant={"ghost"}
              onClick={() => (hasBack.onClick ? hasBack.onClick() : back())}
              iconOnly
            >
              <ArrowRight className="h w" />
            </Button>
          )}
        </div>
        <div className="col-span-10 text-center font-bold text-alpha-800">
          {title}
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default MobileHeader
