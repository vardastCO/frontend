"use client"

import { IconSelector } from "@tabler/icons-react"
import { useSession } from "next-auth/react"
import { Avatar } from "../Avatar"
type Props = {}

const UserMenu = (props: Props) => {
  const { data: session } = useSession()
  if (session)
    return (
      <div className="w-full">
        <div className="flex w-full items-center gap-2">
          <Avatar
            src={`https://api.dicebear.com/5.x/big-ears-neutral/svg?seed=
            ${session?.user?.profile.fullName}`}
            alt={session?.user?.profile.fullName || ""}
          />
          <div className="flex flex-1 flex-col truncate">
            <span className="truncate font-medium">
              {session?.user?.profile.fullName}
            </span>
            <span className="truncate text-sm text-gray-500">
              {session?.user?.profile.email}
            </span>
          </div>
          <IconSelector className="h-3 w-3 text-gray-600" />
        </div>
      </div>
    )

  return <></>
}

export default UserMenu
