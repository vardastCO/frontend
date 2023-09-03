"use client"

import { useContext } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import * as Dialog from "@radix-ui/react-dialog"
import { useAtom } from "jotai"
import { LucideArrowRight, LucideInfo, LucideMailbox } from "lucide-react"

import { Button } from "@core/components/ui/button"
import { PublicContext } from "@/app/(public)/components/public-provider"

const MobileMySpace = () => {
  const { push } = useRouter()
  const { mySpaceVisibilityAtom } = useContext(PublicContext)
  const [mySpaceVisibility, setMySpaceVisibility] = useAtom(
    mySpaceVisibilityAtom
  )

  return (
    <Dialog.Root open={mySpaceVisibility} onOpenChange={setMySpaceVisibility}>
      <Dialog.Content className="fixed inset-0 z-40 h-[calc(100%-calc(64px+var(--safe-area-inset-bottom)))] overflow-y-auto overscroll-contain bg-white">
        <div>
          <div className="sticky top-0 border-b border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => {
                  setMySpaceVisibility(false)
                }}
                variant="ghost"
                size="small"
                iconOnly
              >
                <LucideArrowRight className="h-5 w-5" />
              </Button>
              <div className="font-bold text-gray-800">وردست من</div>
            </div>
          </div>
          <div className="flex flex-col gap-8 p-4">
            <div className="flex items-center justify-center border-b border-gray-200 py-8">
              <Link
                onClick={() => {
                  setMySpaceVisibility(false)
                }}
                href="/admin"
                prefetch={false}
                className="btn btn-primary"
              >
                ورود / ثبت‌نام
              </Link>
            </div>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  onClick={() => {
                    setMySpaceVisibility(false)
                  }}
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
                  onClick={() => {
                    setMySpaceVisibility(false)
                  }}
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
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default MobileMySpace
