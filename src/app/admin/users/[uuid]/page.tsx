import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"

import UserEdit from "../components/UserEdit"

const UserEditPage = async ({
  params: { uuid }
}: {
  params: { uuid: string }
}) => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.users.user.update")) {
    redirect("/admin")
  }
  return uuid && <UserEdit uuid={uuid} />
}

export default UserEditPage
