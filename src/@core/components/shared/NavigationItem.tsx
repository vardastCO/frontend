"use client"
import { NavigationItemType } from "@core/types/Navigation"
import { IconChevronDown } from "@tabler/icons-react"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "../Button"
import { TablerIcons } from "./TablerIcon"

type Props = {
  menu: NavigationItemType
}

const NavigationItem = (props: Props) => {
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(false)
  const { menu } = props

  const toggleOpen = () => {
    const oldOpen = open
    setOpen(!oldOpen)
  }

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
      <li
        className={clsx([
          "app-navigation-item",
          menu.items && "has-child",
          isActive(menu.path) && "active",
          open && "open"
        ])}
      >
        <span>
          <Link href={menu.path} className="app-navigation-item-link">
            <TablerIcons icon={menu.icon} className="icon" stroke={1.5} />
            <span className="flex-1">{menu.title}</span>
          </Link>
          {menu.items && (
            <Button
              className="app-navigation-item-arrow"
              noStyle
              onPress={() => !isActive(menu.path) && toggleOpen()}
            >
              <IconChevronDown className="h-4 w-4" />
            </Button>
          )}
        </span>
        {menu.items && (
          <ol className="app-navigation-item-children">
            {menu.items.map((menuChildren, idx) => {
              return (
                <li key={idx} className="app-navigation-item-children-item">
                  <Link
                    href={menuChildren.path}
                    className={clsx([
                      "app-navigation-item-children-item-link",
                      isActive(menuChildren.path) && "active"
                    ])}
                  >
                    <span>{menuChildren.title}</span>
                  </Link>
                </li>
              )
            })}
          </ol>
        )}
      </li>
    </>
  )
}

export default NavigationItem
