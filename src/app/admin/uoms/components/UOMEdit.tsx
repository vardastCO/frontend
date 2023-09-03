"use client"

import { notFound } from "next/navigation"

import { Uom, useGetUomQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import UOMForm from "@/app/admin/uoms/components/UOMForm"

type Props = {
  uuid: string
}

const UOMEdit = ({ uuid }: Props) => {
  const { isLoading, error, data } = useGetUomQuery(
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

  return <UOMForm uom={data.uom as Uom} />
}

export default UOMEdit
