import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import Offers from "@/app/admin/offers/components/Offers"

const OffersIndex = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.offer.index")) {
    redirect("/admin")
  }

  return <Offers />
}

export default OffersIndex
