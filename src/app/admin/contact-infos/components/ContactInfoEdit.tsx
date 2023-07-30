"use client"

import { notFound } from "next/navigation"

import { ContactInfo, useGetContactInfoQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import ContactInfoForm from "@/app/admin/contact-infos/components/ContactInfoForm"

type ContactInfoEditProps = {
  uuid: string
  fallback: string
}

const ContactInfoEdit = ({ uuid, fallback }: ContactInfoEditProps) => {
  const { isLoading, error, data } = useGetContactInfoQuery(
    graphqlRequestClient,
    {
      id: +uuid
    }
  )

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return (
    <ContactInfoForm
      passedContactInfo={data.contactInfo as ContactInfo}
      fallback={fallback}
    />
  )
}

export default ContactInfoEdit
