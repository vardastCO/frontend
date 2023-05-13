import Loading from "@/@core/components/shared/Loading"
import LoadingFailed from "@/@core/components/shared/LoadingFailed"
import PageHeader from "@/@core/components/shared/PageHeader"
import AreaCard from "@/app/admin/locations/components/AreaCard"
import CreateCountry from "@/app/admin/locations/components/CreateCountry"
import NoCountryFound from "@/app/admin/locations/components/NoCountryFound"
import { Area, useGetCityQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import useTranslation from "next-translate/useTranslation"

import { useRouter } from "next/router"

export default function LocationsIndex() {
  const { t } = useTranslation()
  const router = useRouter()
  const countrySlug = router.query.countrySlug as string
  const provinceSlug = router.query.provinceSlug as string
  const citySlug = router.query.citySlug as string

  const { isLoading, error, data } = useGetCityQuery(graphqlRequestClient, {
    slug: citySlug
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.city.areas) return <NoCountryFound />

  return (
    <>
      <PageHeader title={t("locations_index_title")} slot={<CreateCountry />} />
      <div>
        <div className="flex flex-col gap-2">
          {data?.city.areas?.map((area) => (
            <AreaCard key={area.id} area={area as Area} />
          ))}
        </div>
      </div>
    </>
  )
}
