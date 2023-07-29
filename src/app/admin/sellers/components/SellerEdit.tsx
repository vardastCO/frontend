"use client"

import { notFound } from "next/navigation"

import { Seller, useGetSellerQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import SellerForm from "@/app/admin/sellers/components/SellerForm"

type Props = {
  uuid: string
}

const BrandEdit = ({ uuid }: Props) => {
  const { isLoading, error, data } = useGetSellerQuery(graphqlRequestClient, {
    id: +uuid
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return <SellerForm seller={data.seller as Seller} />
}

export default BrandEdit
