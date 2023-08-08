import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"

import Countries from "./components/Countries"

const LocationsIndex = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.base.location.country.index")) {
    redirect("/admin")
  }

  return <Countries />
}

export default LocationsIndex
