import { redirect } from "next/navigation"

import { AddressRelatedTypes } from "@/generated"

import AddressForm from "@/app/admin/addresses/components/AddressForm"

type CreateAddressPageProps = {
  params: { slug: Array<string | number> }
  searchParams: { [key: string]: string | string[] | undefined }
}

const CreateAddressPage = ({
  searchParams: { id, type, fallback }
}: CreateAddressPageProps) => {
  if (!id || !type || !fallback) {
    redirect(fallback ? fallback[0] : "/admin/addresses")
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
