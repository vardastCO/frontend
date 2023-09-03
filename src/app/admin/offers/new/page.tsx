import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"

import OfferForm from "../components/OfferForm"

const CreateOfferPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.offer.store.mine")) {
    redirect("/admin")
  }

  return <OfferForm />
}

export default CreateOfferPage
