"use client"

import { IconLogout } from "@tabler/icons-react"
import { signOut, useSession } from "next-auth/react"
import { Avatar } from "../ui/Avatar"
import { Button } from "../ui/Button"
type Props = {}

const UserMenu = (props: Props) => {
  const { data: session } = useSession()
  if (session)
    return (
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
    )

  return <></>
}

export default UserMenu
