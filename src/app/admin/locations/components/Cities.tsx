"use client"

import { City, useGetProvinceQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import PageHeader from "@core/components/shared/PageHeader"
import useTranslation from "next-translate/useTranslation"
import { notFound } from "next/navigation"
import CityCard from "./CityCard"
import CreateCity from "./CreateCity"

type Props = {
  countrySlug: string
  provinceSlug: string
}

const Cities = ({ provinceSlug, countrySlug }: Props) => {
  const { t } = useTranslation()
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
      <div>
        <div className="flex flex-col gap-2">
          {data.province.cities.map(
            (city) =>
              city && (
                <CityCard
                  key={city.id}
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
