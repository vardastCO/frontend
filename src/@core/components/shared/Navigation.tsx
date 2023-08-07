"use client"

import { useSession } from "next-auth/react"

import { NavigationType } from "@core/types/Navigation"

import NavigationItem from "./NavigationItem"

type Props = {
  menus: NavigationType[]
}

const Navigation = (props: Props) => {
  const { data: session } = useSession()
  const { menus } = props

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
                menuSection.items.map(
                  (menuItem, idx) =>
                    ((menuItem.permission &&
                      session?.abilities.includes(menuItem.permission)) ||
                      !menuItem.permission) && (
                      <NavigationItem key={idx} menu={menuItem} />
                    )
                )}
            </ol>
          </section>
        )
      })}
    </>
  )
}

export default Navigation
