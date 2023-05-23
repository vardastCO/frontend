"use client"

import { Province, useGetCountryQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import PageHeader from "@core/components/shared/PageHeader"
import useTranslation from "next-translate/useTranslation"
import { notFound } from "next/navigation"
import CreateProvince from "./CreateProvince"
import ProvinceCard from "./ProvinceCard"

type Props = {
  countrySlug: string
}

const Provinces = ({ countrySlug }: Props) => {
  const { t } = useTranslation()
  const { isLoading, error, data } = useGetCountryQuery(graphqlRequestClient, {
    slug: countrySlug
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return (
    <>
      <PageHeader title={data.country.name}>
        <CreateProvince countryId={data.country.id} />
      </PageHeader>
      {!data.country.provinces.length && <NoResult entity="province" />}
      <div>
        <div className="flex flex-col gap-2">
          {data.country.provinces.map(
            (province) =>
              province && (
                <ProvinceCard
                  key={province.id}
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
