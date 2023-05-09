import { IconLogout, type Icon } from "@tabler/icons-react"
import { clsx } from "clsx"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
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
        "z-10 flex-shrink-0 border-l border-n-gray-200 py-5 transition-all",
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
          {session && (
            <div className="w-full">
              <div className="flex w-full items-center gap-2">
                <div className="avatar">
                  <Image
                    src="https://api.dicebear.com/5.x/big-ears-neutral/svg?seed=Convertible"
                    fill
                    alt="..."
                  />
                </div>
                <div className="flex flex-1 flex-col truncate">
                  <span className="truncate">
                    {session?.user?.profile.fullName}
                  </span>
                  <span className="truncate">
                    {session?.user?.profile.cellphone}
                  </span>
                </div>
                <Button
                  intent="ghost"
                  size="small"
                  iconOnly
                  onPress={() => signOut()}
                >
                  <IconLogout className="icon" />
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
