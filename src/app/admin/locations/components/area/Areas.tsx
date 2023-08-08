"use client"

import { useContext, useState } from "react"
import { notFound } from "next/navigation"
import { useSession } from "next-auth/react"

import { Area, useGetCityQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import PageHeader from "@core/components/shared/PageHeader"
import DeleteAreaModal from "@/app/admin/locations/components/area/DeleteAreaModal"

import FiltersBar from "../FiltersBar"
import { LocationsContext } from "../LocationsProvider"
import AreaCard from "./AreaCard"
import CreateArea from "./CreateArea"

type Props = {
  citySlug: string
}

const Areas = ({ citySlug }: Props) => {
  const { data: session } = useSession()
  const { activesOnly } = useContext(LocationsContext)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [areaToDelete, setAreaToDelete] = useState<Area>()
  const { isLoading, error, data } = useGetCityQuery(graphqlRequestClient, {
    slug: citySlug
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return (
    <>
      <DeleteAreaModal
        areaToDelete={areaToDelete}
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
      />
      <PageHeader title={data.city.name}>
        {session?.abilities.includes("gql.base.location.area.store") && (
          <CreateArea cityId={data.city.id} />
        )}
      </PageHeader>
      {!data.city.areas.length && <NoResult entity="area" />}
      <FiltersBar />
      <div>
        <div className="flex flex-col gap-2">
          {data.city.areas.map(
            (area) =>
              area && (
                <AreaCard
                  onDeleteTriggered={(area) => {
                    setDeleteModalOpen(true)
                    setAreaToDelete(area)
                  }}
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
