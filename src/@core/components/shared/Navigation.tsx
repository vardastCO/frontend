"use client"

import { usePathname } from "next/navigation"
import MenuItem from "./NavigationItem"

type Props = {
  menus: {
    title: string
    path: string
    icon: string
  }[]
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
    <ol className="flex flex-col gap-1">
      {menus.map((menu, idx) => {
        return (
          <li key={idx}>
            <MenuItem menu={menu} isActive={isActive(menu.path)} />
          </li>
        )
      })}
    </ol>
  )
}

export default Navigation
