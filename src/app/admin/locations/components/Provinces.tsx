"use client"

import { useGetCountryQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import ProvinceCard from "./ProvinceCard"

type Props = {
  countrySlug: string
}

const Provinces = ({ countrySlug }: Props) => {
  const { isLoading, error, data } = useGetCountryQuery(graphqlRequestClient, {
    slug: countrySlug
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.country.provinces) return <NoResult entity="province" />

  return (
    <div className="flex flex-col gap-2">
      {data?.country.provinces?.map(
        (province) =>
          province && (
            <ProvinceCard
              key={province.id}
              province={province}
              countrySlug={countrySlug}
            />
          )
      )}
    </div>
  )
}

export default Provinces
