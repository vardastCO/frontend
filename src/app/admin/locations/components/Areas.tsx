"use client"

import { Area, useGetCityQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import PageHeader from "@core/components/shared/PageHeader"
import { notFound } from "next/navigation"
import { useContext } from "react"
import AreaCard from "./AreaCard"
import CreateArea from "./CreateArea"
import FiltersBar from "./FiltersBar"
import { LocationsContext } from "./LocationsProvider"

type Props = {
  citySlug: string
}

const Areas = ({ citySlug }: Props) => {
  const { activesOnly } = useContext(LocationsContext)
  const { isLoading, error, data } = useGetCityQuery(graphqlRequestClient, {
    slug: citySlug
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return (
    <>
      <PageHeader title={data.city.name}>
        <CreateArea cityId={data.city.id} />
      </PageHeader>
      {!data.city.areas.length && <NoResult entity="area" />}
      <FiltersBar />
      <div>
        <div className="flex flex-col gap-2">
          {data.city.areas.map(
            (area) =>
              area && (
                <AreaCard
                  show={activesOnly ? area.isActive : true}
                  key={area.id}
                  area={area as Area}
                />
              )
          )}
        </div>
      </div>
    </>
  )
}

export default Areas
