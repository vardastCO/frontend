"use client"

import { useState } from "react"
import { useClickOutside } from "@mantine/hooks"
import clsx from "clsx"
import { LucideChevronsUpDown, LucideLogOut } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
// import { useTheme } from "next-themes"
import useTranslation from "next-translate/useTranslation"

import { Button } from "@core/components/ui/button"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const UserMenu = () => {
  const { t } = useTranslation()
  // const { theme, setTheme } = useTheme()
  const { data: session } = useSession()
  const [open, setOpen] = useState<boolean>(false)
  const ref = useClickOutside(() => {
    if (open) setOpen(false)
  })

  const toggle = () => {
    const oldOpen = open
    setOpen(!oldOpen)
  }

  // const toggleTeheme = () => {
  //   const newTheme = theme === "dark" ? "light" : "dark"
  //   setTheme(newTheme)
  // }

  return (
    <>
      {session && session.user && (
        <div ref={ref} className={clsx(["w-full", open && "-mb-2"])}>
          <div
            className={clsx([
              open ? "card -mx-2 flex flex-col gap-3 rounded p-2" : ""
            ])}
          >
            {open && (
              <div className="flex flex-col gap-1">
                {/* <Button
                  onClick={() => toggleTeheme()}
                  variant="ghost"
                  className="justify-start text-start"
                >
                  <>
                    {theme === "dark" ? (
                      <LucideSun className="icon" />
                    ) : (
                      <LucideMoon className="icon" />
                    )}
                    {theme === "dark"
                      ? t("common:switch_dark_mode_off")
                      : t("common:switch_dark_mode_on")}
                  </>
                </Button> */}
                <Button
                  onClick={() => signOut()}
                  variant="ghost"
                  className="justify-start text-start"
                >
                  <>
                    <LucideLogOut className="icon" />
                    {t("common:logout")}
                  </>
                </Button>
              </div>
            )}
            <Button
              onClick={() => toggle()}
              noStyle
              className="flex w-full items-center gap-2 text-start outline-none focus-visible:outline-none"
            >
              <Avatar>
                {session.profile.avatarFile && (
                  <AvatarImage
                    src={session.profile.avatarFile.presignedUrl.url}
                    alt={session.profile.fullName || ""}
                  />
                )}
                <AvatarFallback>{session.profile.firstName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col truncate">
                <span className="truncate font-medium text-gray-800">
                  {session.profile.fullName}
                </span>
                <span className="truncate text-sm text-gray-500">
                  {session.profile.email}
                </span>
              </div>
              <LucideChevronsUpDown className="h-3 w-3 text-gray-600" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default UserMenu
