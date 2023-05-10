"use client"

import { type Icon } from "@tabler/icons-react"
import { useState } from "react"
import MenuBar from "./MenuBar"

type Props = {
  menus: {
    title: string
    path: string
    icon: Icon
  }[]
}

const Sidebar = (props: Props) => {
  const [open, setOpen] = useState(true)

  const toggleMenu = () => {
    const current = open
    setOpen(!current)
  }

  return (
    <div className="sticky top-0 flex-shrink-0">
      <div className="relative flex h-full">
        {/* <button
          className="btn-xs btn-secondary btn absolute left-0 top-0 z-20 -ml-2.5 mt-8 h-5 w-5 rounded-full p-0"
          onClick={toggleMenu}
        >
          <IconFoldUp
            className={`icon h-4 w-4 text-gray-500 ${
              open ? "rotate-90" : "-rotate-90"
            }`}
          />
        </button> */}
        {/* <SpacesBar /> */}
        <MenuBar menus={props.menus} open={open} />
      </div>
    </div>
  )
}

export default Sidebar
