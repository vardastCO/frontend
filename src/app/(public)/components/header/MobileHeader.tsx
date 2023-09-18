"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

import { Button } from "@core/components/ui/button"

interface IModalHeader {
  title: string
  hasBack?: boolean
}

const MobileHeader: React.FC<IModalHeader> = ({ title, hasBack }) => {
  const { back } = useRouter()
  return (
    <div className="sticky top-0 border-b border-alpha-200 bg-alpha-100">
      <div className="grid h-4xl grid-cols-3 items-center">
        <div>
          {hasBack && (
            <Button variant={"ghost"} onClick={() => back()} iconOnly>
              <ArrowRight className="h w" />
            </Button>
          )}
        </div>
        <div className="text-center font-bold text-alpha-800">{title}</div>
        <div></div>
      </div>
    </div>
  )
}

export default MobileHeader
