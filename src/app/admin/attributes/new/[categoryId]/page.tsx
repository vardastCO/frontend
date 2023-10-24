import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import AttributeForm from "@/app/admin/attributes/components/AttributeForm"

const CreateAttributePage = async ({
  params: { categoryId }
}: {
  params: { categoryId: string }
}) => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.products.attribute.store")) {
    redirect("/admin")
  }

  return <AttributeForm categoryId={categoryId} />
}

export default CreateAttributePage
