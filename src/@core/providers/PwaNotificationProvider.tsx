"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { PlusIcon, ShareIcon } from "@heroicons/react/24/outline"
import * as Dialog from "@radix-ui/react-dialog"

import { Button } from "@core/components/ui/button"

import logoLogo from "@/assets/logo-type.svg"

type Props = {
  children: React.ReactNode
  isMobileView?: boolean
}

export default function PwaNotificationProvider({
  isMobileView,
  children
}: Props) {
  const [pwaModal, setPwaModal] = useState(false)

  const isPwa = () => {
    return ["fullscreen", "standalone", "minimal-ui"].some(
      (displayMode) =>
        window.matchMedia("(display-mode: " + displayMode + ")").matches
    )
  }

  useEffect(() => {
    try {
      if (!isPwa() && isMobileView && !localStorage.getItem("pwa")) {
        setPwaModal(true)
      }
    } catch (error) {
      console.log(error)
    }
  }, [isMobileView])

  if (isMobileView) {
    return (
      <>
        <Dialog.Root open={pwaModal} onOpenChange={setPwaModal}>
          <Dialog.Content className="fixed inset-0 z-[999] h-full overflow-y-auto overscroll-contain bg-white">
            <div className="flex h-full  flex-col">
              <div className="flex flex-1 flex-col justify-center gap-y overflow-y-scroll p text-center">
                <Image
                  src={logoLogo}
                  alt={process.env.NEXT_PUBLIC_TITLE as string}
                  className="mx-auto h-44 w-44"
                />
                <h1 className="text-lg leading-8">
                  نسخه وب اپلیکیشن (PWA) وردست را به صفحه اصلی اضافه کنید
                </h1>
                <p className="">
                  با این کار می توانید برای همیشه و بدون نیاز به به روز رسانی از
                  خدمات وردست استفاده کنید
                </p>
                <ul className="list-inside py-10 text-right font-bold leading-10">
                  <li className="flex justify-between">
                    <p>
                      1- روی دکمه{" "}
                      <span className="px-2 font-bold text-primary">Share</span>{" "}
                      کلیک کنید.
                    </p>
                    <span className="my-auto">
                      <ShareIcon className="w-6 opacity-50" />
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <p>
                      2- روی دکمه{" "}
                      <span className="px-2 font-bold text-primary">
                        Add to Home Screen
                      </span>{" "}
                      کلیک کنید.
                    </p>
                    <span className="my-auto opacity-50">
                      <PlusIcon className="w-7" />
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <p>
                      3- در پنجره باز شده روی{" "}
                      <span className="px-2 font-bold text-primary">Add</span>{" "}
                      کلیک کنید.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="p">
                <Button
                  block
                  onClick={() => {
                    setPwaModal(false)
                    localStorage.setItem("pwa", "true")
                  }}
                >
                  !متوجه شدم
                </Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Root>

        {children}
      </>
    )
  }
  return <>{children}</>
}
