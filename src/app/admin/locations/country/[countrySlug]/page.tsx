import CreateProvince from "@/app/admin/locations/components/CreateProvince"
import PageHeader from "@core/components/shared/PageHeader"
import useTranslation from "next-translate/useTranslation"
import Provinces from "../../components/Provinces"

const ProvincesPage = ({ params }: { params: { countrySlug: string } }) => {
  const { t } = useTranslation()
  const countrySlug = params.countrySlug as string

  return (
    <>
      <PageHeader title={t("common:locations_index_title")}>
        <CreateProvince countryId={0} />
      </PageHeader>
      <div>
        <Provinces countrySlug={countrySlug} />
      </div>
    </>
  )
}

export default ProvincesPage
