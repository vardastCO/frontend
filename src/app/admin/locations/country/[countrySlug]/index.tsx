import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import CreateProvince from "@/@core/components/admin/Location/CreateProvince"
import NoCountryFound from "@/@core/components/admin/Location/NoCountryFound"
import ProvinceCard from "@/@core/components/admin/Location/ProvinceCard"
import Loading from "@/@core/components/shared/Loading/Loading"
import LoadingFailed from "@/@core/components/shared/LoadingFailed/LoadingFailed"
import PageHeader from "@/@core/components/shared/PageHeader/PageHeader"
import AdminLayout from "@/@core/layouts/AdminLayout"
import { Province, useGetCountryQuery } from "@/generated"
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

LocationsIndex.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default LocationsIndex
