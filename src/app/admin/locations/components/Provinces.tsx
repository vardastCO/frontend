"use client"

import { useContext } from "react"
import { notFound } from "next/navigation"
import { useSession } from "next-auth/react"

import { Province, useGetCountryQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import PageHeader from "@core/components/shared/PageHeader"

import CreateProvince from "./CreateProvince"
import FiltersBar from "./FiltersBar"
import { LocationsContext } from "./LocationsProvider"
import ProvinceCard from "./ProvinceCard"

type Props = {
  countrySlug: string
}

const Provinces = ({ countrySlug }: Props) => {
  const { data: session } = useSession()
  const { activesOnly } = useContext(LocationsContext)
  const { isLoading, error, data } = useGetCountryQuery(graphqlRequestClient, {
    slug: countrySlug
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return (
    <>
      <PageHeader title={data.country.name}>
        {session?.abilities.includes("gql.base.location.province.store") && (
          <CreateProvince countryId={data.country.id} />
        )}
      </PageHeader>
      {!data.country.provinces.length && <NoResult entity="province" />}
      <FiltersBar />
      <div>
        <div className="flex flex-col gap-2">
          {data.country?.provinces.map(
            (province) =>
              province && (
                <ProvinceCard
                  key={province.id}
                  show={activesOnly ? province.isActive : true}
                  province={province as Province}
                  countrySlug={countrySlug}
                />
              )
          )}
        </div>
      </div>
    </>
  )
}

export default Provinces
