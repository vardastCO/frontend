import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"

import AttributeForm from "../components/AttributeForm"

const CreateAttributePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.attribute.store")) {
    redirect("/admin")
  }

  return <AttributeForm />
}

export default CreateAttributePage
