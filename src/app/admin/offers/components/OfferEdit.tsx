"use client"

import { notFound } from "next/navigation"

import { Offer, useGetOfferQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import OfferForm from "@/app/admin/offers/components/OfferForm"

type Props = {
  uuid: string
}

const OfferEdit = ({ uuid }: Props) => {
  const { isLoading, error, data } = useGetOfferQuery(
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

  return <OfferForm offer={data.offer as Offer} />
}

export default OfferEdit
