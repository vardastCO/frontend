import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import Sellers from "@/app/admin/sellers/components/Sellers"

const SellersIndex = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.seller.index")) {
    redirect("/admin")
  }

  return <Sellers />
}

export default SellersIndex
