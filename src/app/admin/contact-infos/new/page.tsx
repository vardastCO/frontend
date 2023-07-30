import { redirect } from "next/navigation"

import { ContactInfoRelatedTypes } from "@/generated"

import ContactInfoForm from "@/app/admin/contact-infos/components/ContactInfoForm"

type CreateContactInfoPageProps = {
  params: { slug: Array<string | number> }
  searchParams: { [key: string]: string | string[] | undefined }
}

const CreateContactInfoPage = ({
  searchParams: { id, type, fallback }
}: CreateContactInfoPageProps) => {
  if (!id || !type || !fallback) {
    redirect(fallback ? fallback[0] : "/admin/contact-infos")
  }
  return (
    <ContactInfoForm
      relatedId={+id}
      relatedType={type as keyof typeof ContactInfoRelatedTypes}
      fallback={fallback as string}
    />
  )
}

export default CreateContactInfoPage
