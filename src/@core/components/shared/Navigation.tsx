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
          <section className="app-navigation-section" key={sectionId}>
            <ol className="app-navigation-section-list">
              {menuSection.title && (
                <li className="app-navigation-section-label">
                  {menuSection.title}
                </li>
              )}
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
