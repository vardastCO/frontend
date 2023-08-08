import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"

import UOMs from "./components/UOMs"

const UOMsIndex = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.uom.index")) {
    redirect("/admin")
  }

  return <UOMs />
}

export default UOMsIndex
