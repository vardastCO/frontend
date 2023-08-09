"use client"

import { Dispatch, useState } from "react"
import { useClickOutside } from "@mantine/hooks"
import clsx from "clsx"
import { SetStateAction } from "jotai"

import { NavigationType } from "@core/types/Navigation"

import Navigation from "./Navigation"
import UserMenu from "./UserMenu"

type SidebarProps = {
  open: boolean
  onOpenChanged: Dispatch<SetStateAction<boolean>>
  menus: NavigationType[]
}

const Sidebar = ({ menus, open, onOpenChanged }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useClickOutside(() => {
    if (open) {
      onOpenChanged(false)
      setIsOpen(false)
    }
  })

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 h-full w-full bg-gray-800 bg-opacity-40"></div>
      )}
      <div ref={ref} className={clsx(["app-sidebar", open ? "open" : ""])}>
        <div className="app-sidebar-inner">
          {/* <SpacesBar /> */}
          <div className="app-navigation">
            <div className="flex h-full w-full flex-col">
              <div className="flex h-full flex-col px-4">
                {/* <OrganizationMenu /> */}
                <div className="app-navigation-container">
                  <Navigation menus={menus} />
                </div>
                <UserMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
