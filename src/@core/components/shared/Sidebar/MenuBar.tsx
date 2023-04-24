import { type Icon } from "@tabler/icons-react"
import { clsx } from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import OrganizationMenu from "../OrganizationMenu/OrganizationMenu"

type Props = {
  open: boolean
  menus: {
    title: string
    path: string
    icon: Icon
  }[]
}

const Sidebar = (props: Props) => {
  const router = useRouter()

  const isActive = (linkPath: string): boolean => {
    const currentPathModified = router.pathname.split("/").slice(2).join("/")
    const linkPathModified = linkPath.split("/").slice(2).join("/")
    return linkPathModified === currentPathModified
      ? true
      : linkPathModified !== "" &&
          currentPathModified.startsWith(linkPathModified)
  }

  return (
    <div
      className={clsx([
        "z-10 flex-shrink-0 border-l border-n-gray-200 py-5 transition-all",
        props.open && "w-64",
        ,
        !props.open && "w-0 translate-x-full overflow-hidden opacity-0"
      ])}
    >
      <div className="flex h-full w-full flex-col">
        <div className="px-4">
          <OrganizationMenu />
          <div>
            <ol className="flex flex-col gap-1">
              {props.menus.map((menu, idx) => {
                return (
                  <li key={idx}>
                    <Link
                      href={menu.path}
                      className={clsx([
                        "flex w-full items-center space-x-2 space-x-reverse rounded px-2 py-3 font-semibold leading-normal ",
                        isActive(menu.path)
                          ? "bg-n-gray-200 text-n-gray-800"
                          : "text-n-gray-700 hover:bg-n-gray-100"
                      ])}
                    >
                      <menu.icon
                        className={clsx([
                          "h-5 w-5",
                          isActive(menu.path)
                            ? "text-n-gray-700"
                            : "text-n-gray-400"
                        ])}
                        strokeWidth={1.5}
                      />
                      <span>{menu.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
