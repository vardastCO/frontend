import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import UOMEdit from "@/app/admin/uoms/components/UOMEdit"

const UOMEditPage = async ({
  params: { uuid }
}: {
  params: { uuid: string }
}) => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.uom.update")) {
    redirect("/admin")
  }

  return uuid && <UOMEdit uuid={uuid} />
}

export default UOMEditPage
