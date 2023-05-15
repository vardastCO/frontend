"use client"

import { Area, useGetCityQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import AreaCard from "./AreaCard"
import NoCountryFound from "./NoCountryFound"

type Props = {
  citySlug: string
}

const Areas = ({ citySlug }: Props) => {
  const { isLoading, error, data } = useGetCityQuery(graphqlRequestClient, {
    slug: citySlug
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.city.areas) return <NoCountryFound />

  return (
    <div className="flex flex-col gap-2">
      {data?.city.areas.map(
        (area) => area && <AreaCard key={area.id} area={area as Area} />
      )}
    </div>
  )
}

export default Areas
