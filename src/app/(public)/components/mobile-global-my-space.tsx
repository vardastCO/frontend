"use client"

import Link from "next/link"
import { LucideArrowRight, LucideInfo, LucideMailbox } from "lucide-react"

import { Button } from "@core/components/ui/button"

const MobileMySpace = () => {
  return (
    <>
      <div className="sticky top-0 border-b border-gray-200 bg-white p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="small" iconOnly>
            <LucideArrowRight className="h-5 w-5" />
          </Button>
          <div className="font-bold text-gray-800">وردست من</div>
        </div>
      </div>
      <div className="flex flex-col gap-8 p-4">
        <div className="flex items-center justify-center border-b border-gray-200 py-8">
          <Link href="/admin" prefetch={false} className="btn btn-primary">
            ورود / ثبت‌نام
          </Link>
        </div>
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              href="/about"
              prefetch={false}
              className="flex items-center gap-1.5"
            >
              <LucideInfo className="h-5 w-5 text-gray-400" />
              درباره وردست
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              prefetch={false}
              className="flex items-center gap-1.5"
            >
              <LucideMailbox className="h-5 w-5 text-gray-400" />
              تماس با ما
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default MobileMySpace
