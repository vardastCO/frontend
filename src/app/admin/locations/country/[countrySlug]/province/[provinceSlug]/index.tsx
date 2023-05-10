import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import CityCard from "@/@core/components/admin/Location/CityCard"
import CreateCity from "@/@core/components/admin/Location/CreateCity"
import NoCountryFound from "@/@core/components/admin/Location/NoCountryFound"
import Loading from "@/@core/components/shared/Loading/Loading"
import LoadingFailed from "@/@core/components/shared/LoadingFailed/LoadingFailed"
import PageHeader from "@/@core/components/shared/PageHeader/PageHeader"
import AdminLayout from "@/@core/layouts/AdminLayout"
import { City, useGetProvinceQuery } from "@/generated"
import { NextPageWithLayout } from "@/pages-old/_app"
import { GetStaticPaths } from "next"
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

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

const LocationsIndex: NextPageWithLayout = () => {
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

LocationsIndex.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default LocationsIndex
