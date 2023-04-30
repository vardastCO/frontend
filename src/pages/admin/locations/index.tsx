import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import CountryCard from "@/@core/components/admin/Location/CountryCard"
import CreateCountry from "@/@core/components/admin/Location/CreateCountry"
import NoCountryFound from "@/@core/components/admin/Location/NoCountryFound"
import Loading from "@/@core/components/shared/Loading/Loading"
import LoadingFailed from "@/@core/components/shared/LoadingFailed/LoadingFailed"
import PageHeader from "@/@core/components/shared/PageHeader/PageHeader"
import AdminLayout from "@/@core/layouts/AdminLayout"
import { Country, useGetAllCountriesQuery } from "@/generated"
import { NextPageWithLayout } from "@/pages/_app"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
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

  const { isLoading, error, data } =
    useGetAllCountriesQuery(graphqlRequestClient)

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.countries) return <NoCountryFound />

  return (
    <>
      <PageHeader title={t("locations_index_title")}>
        <CreateCountry />
      </PageHeader>
      <div>
        <div className="flex flex-col gap-2">
          {data?.countries?.map((country) => (
            <CountryCard key={country.id} country={country as Country} />
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
