import { IconLogout, type Icon } from "@tabler/icons-react"
import { clsx } from "clsx"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Avatar } from "../../ui/Avatar"
import { Button } from "../../ui/Button"
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
  const { data: session } = useSession()

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
        "z-10 flex-shrink-0 border-l border-gray-200 py-5 transition-all",
        props.open && "w-64",
        ,
        !props.open && "w-0 translate-x-full overflow-hidden opacity-0"
      ])}
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex h-full flex-col px-4">
          <OrganizationMenu />
          <div className="flex-1">
            <ol className="flex flex-col gap-1">
              {props.menus.map((menu, idx) => {
                return (
                  <li key={idx}>
                    <Link
                      href={menu.path}
                      className={clsx([
                        "flex w-full items-center space-x-2 space-x-reverse rounded px-2 py-3 font-semibold leading-normal ",
                        isActive(menu.path)
                          ? "bg-gray-200 text-gray-800"
                          : "text-gray-700 hover:bg-gray-100"
                      ])}
                    >
                      <menu.icon
                        className={clsx([
                          "h-5 w-5",
                          isActive(menu.path)
                            ? "text-gray-700"
                            : "text-gray-400"
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
          {session && (
            <div className="w-full">
              <div className="flex w-full items-center gap-2">
                <Avatar
                  src="https://api.dicebear.com/5.x/big-ears-neutral/svg?seed=Convertible"
                  alt="..."
                />
                <div className="flex flex-1 flex-col truncate">
                  <span className="truncate font-medium">
                    {session?.user?.profile.fullName}
                  </span>
                  <span className="truncate text-sm text-gray-500" dir="ltr">
                    {session?.user?.profile.email}
                  </span>
                </div>
                <Button
                  intent="ghost"
                  size="small"
                  iconOnly
                  onPress={() => signOut()}
                >
                  <IconLogout className="icon -scale-x-100" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
