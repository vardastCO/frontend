"use client"

import { NavigationType } from "@core/types/Navigation"
import { usePathname } from "next/navigation"
import MenuItem from "./NavigationItem"

type Props = {
  menus: NavigationType[]
}

const Navigation = (props: Props) => {
  const { menus } = props
  const pathname = usePathname()

  const isActive = (linkPath: string): boolean => {
    const currentPathModified = pathname.split("/").slice(2).join("/")
    const linkPathModified = linkPath.split("/").slice(2).join("/")
    return linkPathModified === currentPathModified
      ? true
      : linkPathModified !== "" &&
          currentPathModified.startsWith(linkPathModified)
  }

  return (
    <>
      {menus.map((menuSection, sectionId) => {
        return (
          <section key={sectionId}>
            <ol className="flex flex-col gap-1">
              {menuSection.title && <li>{menuSection.title}</li>}
              {menuSection.items &&
                menuSection.items.map((menuItem, idx) => {
                  return (
                    <li key={idx}>
                      <MenuItem
                        menu={menuItem}
                        isActive={isActive(menuItem.path)}
                      />
                    </li>
                  )
                })}
            </ol>
          </section>
        )
      })}
    </>
  )
}

export default Navigation
