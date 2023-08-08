import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { ContactInfoRelatedTypes } from "@/generated"

import { authOptions } from "@core/lib/authOptions"
import ContactInfoForm from "@/app/admin/contact-infos/components/ContactInfoForm"

type CreateContactInfoPageProps = {
  params: { slug: Array<string | number> }
  searchParams: { [key: string]: string | string[] | undefined }
}

const CreateContactInfoPage = async ({
  searchParams: { id, type, fallback }
}: CreateContactInfoPageProps) => {
  if (!id || !type || !fallback) {
    redirect(fallback ? fallback[0] : "/admin/contact-infos")
  }

  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.users.contact_info.store")) {
    redirect("/admin")
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
