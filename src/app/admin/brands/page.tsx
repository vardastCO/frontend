import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"

import Brands from "./components/Brands"

const BrandsIndex = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.brand.index")) {
    redirect("/admin")
  }

  return <Brands />
}

export default BrandsIndex
