import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import CreateCountry from "@/@core/components/admin/Location/CreateCountry"
import LocationNoCountryFound from "@/@core/components/admin/Location/LocationNoCountryFound"
import LocationProvinceCard from "@/@core/components/admin/Location/LocationProvinceCard"
import Loading from "@/@core/components/shared/Loading/Loading"
import LoadingFailed from "@/@core/components/shared/LoadingFailed/LoadingFailed"
import PageHeader from "@/@core/components/shared/PageHeader/PageHeader"
import AdminLayout from "@/@core/layouts/AdminLayout"
import { Province, useGetCountryQuery } from "@/generated"
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

  const { isLoading, error, data } = useGetCountryQuery(graphqlRequestClient, {
    slug: countrySlug
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.country.provinces) return <LocationNoCountryFound />

  return (
    <>
      <PageHeader title={t("locations_index_title")} slot={<CreateCountry />} />
      <div>
        <div className="flex flex-col gap-2">
          {data?.country.provinces?.map((province) => (
            <LocationProvinceCard
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

LocationsIndex.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default LocationsIndex
