import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"

import UOMForm from "../components/UOMForm"

const CreateUOMPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.uom.store")) {
    redirect("/admin")
  }

  return <UOMForm />
}

export default CreateUOMPage
