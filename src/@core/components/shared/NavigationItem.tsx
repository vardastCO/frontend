"use client"

import { NavigationItemType } from "@core/types/Navigation"
import clsx from "clsx"
import Link from "next/link"
import { TablerIcons } from "./TablerIcon"

type Props = {
  menu: NavigationItemType
  isActive: boolean
}

const MenuItem = (props: Props) => {
  const { menu, isActive } = props
  return (
    <Link
      href={menu.path}
      className={clsx(["app-navigation-item", isActive && "active"])}
    >
      <TablerIcons icon={menu.icon} className="icon" stroke={1.5} />
      <span>{menu.title}</span>
    </Link>
  )
}

export default MenuItem
