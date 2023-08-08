import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import UserForm from "@/app/admin/users/components/UserForm"

const CreateBrandPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.users.user.store")) {
    redirect("/admin")
  }

  return <UserForm />
}

export default CreateBrandPage
