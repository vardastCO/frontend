import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"

import ProductForm from "../components/ProductForm"

const ProductCreatePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.product.store")) {
    redirect("/admin")
  }

  return <ProductForm />
}

export default ProductCreatePage
