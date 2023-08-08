import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"

import Attributes from "./components/Attributes"

const AttributesIndex = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.attribute.index")) {
    redirect("/admin")
  }

  return <Attributes />
}

export default AttributesIndex
