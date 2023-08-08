import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"

import Products from "./components/Products"

export const metadata: Metadata = {
  title: "محصولات"
}

const ProductsIndex = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.product.index")) {
    redirect("/admin")
  }

  return <Products />
}

export default ProductsIndex
