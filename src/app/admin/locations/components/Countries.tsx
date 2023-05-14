"use client"

import { Country, useGetAllCountriesQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import CountryCard from "./CountryCard"
import NoCountryFound from "./NoCountryFound"

type Props = {}

const Countries = (props: Props) => {
  const { isLoading, error, data } =
    useGetAllCountriesQuery(graphqlRequestClient)

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.countries) return <NoCountryFound />

  return (
    <div className="flex flex-col gap-2">
      {data?.countries?.map((country) => (
        <CountryCard key={country.id} country={country as Country} />
      ))}
    </div>
  )
}

export default Countries
