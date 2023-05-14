"use client"

import clsx from "clsx"
import Link from "next/link"
import { TablerIcons } from "./TablerIcon"

type Props = {
  menu: {
    path: string
    icon: string
    title: string
  }
  isActive: boolean
}

const MenuItem = (props: Props) => {
  const { menu, isActive } = props
  return (
    <Link
      href={menu.path}
      className={clsx([
        "flex w-full items-center space-x-2 space-x-reverse rounded px-2 py-3 font-semibold leading-normal ",
        isActive
          ? "bg-gray-200 text-gray-800"
          : "text-gray-700 hover:bg-gray-100"
      ])}
    >
      <TablerIcons
        icon={menu.icon}
        className={clsx([
          "h-5 w-5",
          isActive ? "text-gray-700" : "text-gray-400"
        ])}
        stroke={1.5}
      />
      <span>{menu.title}</span>
    </Link>
  )
}

export default MenuItem
