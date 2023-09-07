import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import AddressEdit from "@/app/admin/addresses/components/AddressEdit"

type AddressEditPageProps = {
  params: { uuid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const AddressEditPage = async ({
  params: { uuid },
  searchParams
}: AddressEditPageProps) => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.users.address.update")) {
    redirect("/admin")
  }

  return (
    uuid && (
      <AddressEdit uuid={uuid} fallback={searchParams.fallback as string} />
    )
  )
}

export default AddressEditPage
