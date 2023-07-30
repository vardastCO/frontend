"use client"

import { notFound } from "next/navigation"

import { Address, useGetAddressQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import AddressForm from "@/app/admin/addresses/components/AddressForm"

type AddressEditProps = {
  uuid: string
  fallback: string
}

const AddressEdit = ({ uuid, fallback }: AddressEditProps) => {
  const { isLoading, error, data } = useGetAddressQuery(graphqlRequestClient, {
    id: +uuid
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return (
    <AddressForm passedAddress={data.address as Address} fallback={fallback} />
  )
}

export default AddressEdit
