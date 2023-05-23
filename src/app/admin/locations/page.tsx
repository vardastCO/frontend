import CreateCountry from "@/app/admin/locations/components/CreateCountry"
import PageHeader from "@core/components/shared/PageHeader"
import useTranslation from "next-translate/useTranslation"
import Countries from "./components/Countries"

const LocationsIndex = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader title={t("common:locations_index_title")}>
        <CreateCountry />
      </PageHeader>
      <div>
        <Countries />
      </div>
    </>
  )
}

export default LocationsIndex
