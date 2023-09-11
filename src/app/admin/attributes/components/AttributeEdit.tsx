"use client"

import { notFound } from "next/navigation"

// import useTranslation from "next-translate/useTranslation"

import { Attribute, useGetAttributeQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import AttributeForm from "@/app/admin/attributes/components/AttributeForm"

type Props = {
  uuid: string
}

const AttributeEdit = ({ uuid }: Props) => {
  // const { t } = useTranslation()
  const { isLoading, error, data } = useGetAttributeQuery(
    graphqlRequestClient,
    {
      id: +uuid
    },
    {
      staleTime: 1000
    }
  )

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return <AttributeForm attribute={data.attribute as Attribute} />
}

export default AttributeEdit
