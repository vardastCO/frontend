import CreateCountry from "@/app/admin/locations/components/CreateCountry"
import PageHeader from "@core/components/shared/PageHeader"
import useTranslation from "next-translate/useTranslation"
import Countries from "./components/Countries"

export default function LocationsIndex() {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader title={t("common:locations.indexTitle")}>
        <CreateCountry />
      </PageHeader>
      <div>
        <Countries />
      </div>
    </>
  )
}
