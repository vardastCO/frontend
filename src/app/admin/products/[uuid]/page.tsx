import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import ProductEdit from "@/app/admin/products/components/ProductEdit"

const ProductEditPage = async ({
  params: { uuid }
}: {
  params: { uuid: number }
}) => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.product.update")) {
    redirect("/admin")
  }

  return uuid && <ProductEdit id={uuid} />
}

export default ProductEditPage
