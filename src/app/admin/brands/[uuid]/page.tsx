import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import BrandEdit from "@/app/admin/brands/components/BrandEdit"

const BrandEditPage = async ({
  params: { uuid }
}: {
  params: { uuid: string }
}) => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.brand.update")) {
    redirect("/admin")
  }

  return uuid && <BrandEdit uuid={uuid} />
}

export default BrandEditPage
