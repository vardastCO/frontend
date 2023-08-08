import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { AddressRelatedTypes } from "@/generated"

import { authOptions } from "@core/lib/authOptions"
import AddressForm from "@/app/admin/addresses/components/AddressForm"

type CreateAddressPageProps = {
  params: { slug: Array<string | number> }
  searchParams: { [key: string]: string | string[] | undefined }
}

const CreateAddressPage = async ({
  searchParams: { id, type, fallback }
}: CreateAddressPageProps) => {
  if (!id || !type || !fallback) {
    redirect(fallback ? fallback[0] : "/admin/addresses")
  }

  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.users.address.store")) {
    redirect("/admin")
  }

  return (
    <AddressForm
      relatedId={+id}
      relatedType={type as keyof typeof AddressRelatedTypes}
      fallback={fallback as string}
    />
  )
}

export default CreateAddressPage
