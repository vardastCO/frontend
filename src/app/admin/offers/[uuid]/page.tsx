import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import OfferEdit from "@/app/admin/offers/components/OfferEdit"

const OfferEditPage = async ({
  params: { uuid }
}: {
  params: { uuid: string }
}) => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.offer.update.mine")) {
    redirect("/admin")
  }

  return uuid && <OfferEdit uuid={uuid} />
}

export default OfferEditPage
