"use client"

import { useGetProvinceQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import CityCard from "./CityCard"
import NoCountryFound from "./NoCountryFound"

type Props = {
  countrySlug: string
  provinceSlug: string
}

const Cities = ({ provinceSlug, countrySlug }: Props) => {
  const { isLoading, error, data } = useGetProvinceQuery(graphqlRequestClient, {
    slug: provinceSlug
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.province.cities) return <NoCountryFound />

  return (
    <div className="flex flex-col gap-2">
      {data?.province.cities?.map(
        (city) =>
          city && (
            <CityCard
              key={city.id}
              city={city}
              countrySlug={countrySlug}
              provinceSlug={provinceSlug}
            />
          )
      )}
    </div>
  )
}

export default Cities
