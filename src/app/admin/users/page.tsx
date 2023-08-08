import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"

import Users from "./components/Users"

const UsersIndex = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.users.user.index")) {
    redirect("/admin")
  }

  return <Users />
}

export default UsersIndex
