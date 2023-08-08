import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"

import BrandForm from "../components/BrandForm"

const CreateBrandPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.brand.store")) {
    redirect("/admin")
  }

  return <BrandForm />
}

export default CreateBrandPage
