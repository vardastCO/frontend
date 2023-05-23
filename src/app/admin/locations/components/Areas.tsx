"use client"

import { Area, useGetCityQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import PageHeader from "@core/components/shared/PageHeader"
import { notFound } from "next/navigation"
import AreaCard from "./AreaCard"

type Props = {
  citySlug: string
}

const Areas = ({ citySlug }: Props) => {
  const { isLoading, error, data } = useGetCityQuery(graphqlRequestClient, {
    slug: citySlug
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return (
    <>
      <PageHeader title={data.city.name}></PageHeader>
      {!data.city.areas.length && <NoResult entity="area" />}
      <div>
        <div className="flex flex-col gap-2">
          {data.city.areas.map(
            (area) => area && <AreaCard key={area.id} area={area as Area} />
          )}
        </div>
      </div>
    </>
  )
}

export default Areas
