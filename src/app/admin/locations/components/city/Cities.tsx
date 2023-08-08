"use client"

import { useContext, useState } from "react"
import { notFound } from "next/navigation"
import { useSession } from "next-auth/react"

import { City, useGetProvinceQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import PageHeader from "@core/components/shared/PageHeader"
import DeleteCityModal from "@/app/admin/locations/components/city/DeleteCityModal"

import FiltersBar from "../FiltersBar"
import { LocationsContext } from "../LocationsProvider"
import CityCard from "./CityCard"
import CreateCity from "./CreateCity"

type Props = {
  countrySlug: string
  provinceSlug: string
}

const Cities = ({ provinceSlug, countrySlug }: Props) => {
  const { data: session } = useSession()
  const { activesOnly } = useContext(LocationsContext)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [cityToDelete, setCityToDelete] = useState<City>()
  const { isLoading, error, data } = useGetProvinceQuery(graphqlRequestClient, {
    slug: provinceSlug
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return (
    <>
      <DeleteCityModal
        cityToDelete={cityToDelete}
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
      />
      <PageHeader title={data.province.name}>
        {session?.abilities.includes("gql.base.location.city.store") && (
          <CreateCity provinceId={data.province.id} />
        )}
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
                  onDeleteTriggered={(city) => {
                    setDeleteModalOpen(true)
                    setCityToDelete(city)
                  }}
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
