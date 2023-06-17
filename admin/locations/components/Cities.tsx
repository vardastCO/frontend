"use client"

import { City, useGetProvinceQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import PageHeader from "@core/components/shared/PageHeader"
import { notFound } from "next/navigation"
import { useContext } from "react"
import CityCard from "./CityCard"
import CreateCity from "./CreateCity"
import FiltersBar from "./FiltersBar"
import { LocationsContext } from "./LocationsProvider"

type Props = {
  countrySlug: string
  provinceSlug: string
}

const Cities = ({ provinceSlug, countrySlug }: Props) => {
  const { activesOnly } = useContext(LocationsContext)
  const { isLoading, error, data } = useGetProvinceQuery(graphqlRequestClient, {
    slug: provinceSlug
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return (
    <>
      <PageHeader title={data.province.name}>
        <CreateCity provinceId={data.province.id} />
      </PageHeader>
      {!data.province.cities.length && <NoResult entity="city" />}
      <FiltersBar />
      <div>
        <div className="flex flex-col gap-2">
          {data.province.cities.map(
            (city) =>
              city && (
                <CityCard
                  key={city.id}
                  show={activesOnly ? city.isActive : true}
                  city={city as City}
                  countrySlug={countrySlug}
                  provinceSlug={provinceSlug}
                />
              )
          )}
        </div>
      </div>
    </>
  )
}

export default Cities
