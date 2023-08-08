import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import SellerEdit from "@/app/admin/sellers/components/SellerEdit"

const BrandEditPage = async ({
  params: { uuid }
}: {
  params: { uuid: string }
}) => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.seller.update")) {
    redirect("/admin")
  }

  return uuid && <SellerEdit uuid={uuid} />
}

export default BrandEditPage
