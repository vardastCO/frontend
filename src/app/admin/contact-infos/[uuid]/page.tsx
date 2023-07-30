import ContactInfoEdit from "@/app/admin/contact-infos/components/ContactInfoEdit"

type ContactInfoEditPageProps = {
  params: { uuid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const ContactInfoEditPage = ({
  params: { uuid },
  searchParams
}: ContactInfoEditPageProps) => {
  return (
    uuid && (
      <ContactInfoEdit uuid={uuid} fallback={searchParams.fallback as string} />
    )
  )
}

export default ContactInfoEditPage
