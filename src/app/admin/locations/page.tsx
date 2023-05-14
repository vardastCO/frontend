import CreateCountry from "@/app/admin/locations/components/CreateCountry"
import PageHeader from "@core/components/shared/PageHeader"
import useTranslation from "next-translate/useTranslation"

export default function LocationsIndex() {
  const { t } = useTranslation()

  //   const { isLoading, error, data } =
  //     useGetAllCountriesQuery(graphqlRequestClient)

  //   if (isLoading) return <Loading />
  //   if (error) return <LoadingFailed />
  //   if (!data?.countries) return <NoCountryFound />

  return (
    <>
      <PageHeader title={t("common:locations.indexTitle")}>
        <CreateCountry />
      </PageHeader>
      <div>
        <div className="flex flex-col gap-2">
          {/* {data?.countries?.map((country) => (
            <CountryCard key={country.id} country={country as Country} />
          ))} */}
        </div>
      </div>
    </>
  )
}
