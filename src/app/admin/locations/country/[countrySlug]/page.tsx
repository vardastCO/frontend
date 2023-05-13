import Loading from "@/@core/components/shared/Loading"
import LoadingFailed from "@/@core/components/shared/LoadingFailed"
import PageHeader from "@/@core/components/shared/PageHeader"
import CreateProvince from "@/app/admin/locations/components/CreateProvince"
import NoCountryFound from "@/app/admin/locations/components/NoCountryFound"
import ProvinceCard from "@/app/admin/locations/components/ProvinceCard"
import { Province, useGetCountryQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import useTranslation from "next-translate/useTranslation"

import { useRouter } from "next/router"

export default function LocationsIndex() {
  const { t } = useTranslation()
  const router = useRouter()
  const countrySlug = router.query.countrySlug as string

  const { isLoading, error, data } = useGetCountryQuery(graphqlRequestClient, {
    slug: countrySlug
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.country.provinces) return <NoCountryFound />

  return (
    <>
      <PageHeader title={t("locations_index_title")}>
        <CreateProvince countryId={data?.country.id} />
      </PageHeader>
      <div>
        <div className="flex flex-col gap-2">
          {data?.country.provinces?.map((province) => (
            <ProvinceCard
              key={province.id}
              province={province as Province}
              countrySlug={countrySlug}
            />
          ))}
        </div>
      </div>
    </>
  )
}
