import Loading from "@/@core/components/shared/Loading"
import LoadingFailed from "@/@core/components/shared/LoadingFailed"
import PageHeader from "@/@core/components/shared/PageHeader"
import CityCard from "@/app/admin/locations/components/CityCard"
import CreateCity from "@/app/admin/locations/components/CreateCity"
import NoCountryFound from "@/app/admin/locations/components/NoCountryFound"
import { City, useGetProvinceQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import useTranslation from "next-translate/useTranslation"

import { useRouter } from "next/router"

export default function LocationsIndex() {
  const { t } = useTranslation()
  const router = useRouter()
  const countrySlug = router.query.countrySlug as string
  const provinceSlug = router.query.provinceSlug as string

  const { isLoading, error, data } = useGetProvinceQuery(graphqlRequestClient, {
    slug: provinceSlug
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.province.cities) return <NoCountryFound />

  return (
    <>
      <PageHeader title={t("locations_index_title")}>
        <CreateCity provinceId={data?.province.id} />
      </PageHeader>
      <div>
        <div className="flex flex-col gap-2">
          {data?.province.cities?.map((city) => (
            <CityCard
              key={city.id}
              city={city as City}
              countrySlug={countrySlug}
              provinceSlug={provinceSlug}
            />
          ))}
        </div>
      </div>
    </>
  )
}
