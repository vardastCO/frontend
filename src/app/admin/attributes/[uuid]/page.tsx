import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import AttributeEdit from "@/app/admin/attributes/components/AttributeEdit"

const AttributeEditPage = async ({
  params: { uuid }
}: {
  params: { uuid: string }
}) => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.attribute.update")) {
    redirect("/admin")
  }

  return uuid && <AttributeEdit uuid={uuid} />
}

export default AttributeEditPage
