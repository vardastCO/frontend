import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import CreateCountry from "@/@core/components/admin/Location/CreateCountry"
import LocationAreaCard from "@/@core/components/admin/Location/LocationAreaCard"
import LocationNoCountryFound from "@/@core/components/admin/Location/LocationNoCountryFound"
import Loading from "@/@core/components/shared/Loading/Loading"
import LoadingFailed from "@/@core/components/shared/LoadingFailed/LoadingFailed"
import PageHeader from "@/@core/components/shared/PageHeader/PageHeader"
import AdminLayout from "@/@core/layouts/AdminLayout"
import { Area, useGetCityQuery } from "@/generated"
import { NextPageWithLayout } from "@/pages/_app"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import { ReactElement } from "react"

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  }
}

const LocationsIndex: NextPageWithLayout = () => {
  const { t } = useTranslation("common")
  const router = useRouter()
  const countrySlug = router.query.countrySlug as string
  const provinceSlug = router.query.provinceSlug as string
  const citySlug = router.query.citySlug as string

  const { isLoading, error, data } = useGetCityQuery(graphqlRequestClient, {
    slug: citySlug
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.city.areas) return <LocationNoCountryFound />

  return (
    <>
      <PageHeader title={t("locations_index_title")} slot={<CreateCountry />} />
      <div>
        <div className="flex flex-col gap-2">
          {data?.city.areas?.map((area) => (
            <LocationAreaCard key={area.id} area={area as Area} />
          ))}
        </div>
      </div>
    </>
  )
}

LocationsIndex.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default LocationsIndex
