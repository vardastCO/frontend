"use client"

import { notFound } from "next/navigation"

import { Brand, useGetBrandQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import BrandForm from "@/app/admin/brands/components/BrandForm"

type Props = {
  uuid: string
}

const BrandEdit = ({ uuid }: Props) => {
  const { isLoading, error, data } = useGetBrandQuery(graphqlRequestClient, {
    id: +uuid
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return <BrandForm brand={data.brand as Brand} />
}

export default BrandEdit
