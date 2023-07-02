"use client"

import { useContext } from "react"
import useTranslation from "next-translate/useTranslation"

import { Country, useGetAllCountriesQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import PageHeader from "@core/components/shared/PageHeader"

import CountryCard from "./CountryCard"
import CreateCountry from "./CreateCountry"
import FiltersBar from "./FiltersBar"
import { LocationsContext } from "./LocationsProvider"

const Countries = () => {
  const { t } = useTranslation()
  const { activesOnly } = useContext(LocationsContext)
  const { isLoading, error, data } =
    useGetAllCountriesQuery(graphqlRequestClient)

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.countries) return <NoResult entity="country" />

  return (
    <>
      <PageHeader title={t("common:locations_index_title")}>
        <CreateCountry />
      </PageHeader>
      <FiltersBar />
      <div>
        <div className="flex flex-col gap-2">
          {data?.countries?.map((country) => (
            <CountryCard
              show={activesOnly ? country.isActive : true}
              key={country.id}
              country={country as Country}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Countries
