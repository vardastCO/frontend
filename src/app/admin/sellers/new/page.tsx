import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"

import SellerForm from "../components/SellerForm"

const CreateSellerPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.seller.store")) {
    redirect("/admin")
  }

  return <SellerForm />
}

export default CreateSellerPage
