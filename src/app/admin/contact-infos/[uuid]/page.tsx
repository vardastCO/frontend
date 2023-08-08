import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import ContactInfoEdit from "@/app/admin/contact-infos/components/ContactInfoEdit"

type ContactInfoEditPageProps = {
  params: { uuid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const ContactInfoEditPage = async ({
  params: { uuid },
  searchParams
}: ContactInfoEditPageProps) => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.users.contact_info.update")) {
    redirect("/admin")
  }

  return (
    uuid && (
      <ContactInfoEdit uuid={uuid} fallback={searchParams.fallback as string} />
    )
  )
}

export default ContactInfoEditPage
