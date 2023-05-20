import Areas from "@/app/admin/locations/components/Areas"
import PageHeader from "@core/components/shared/PageHeader"
import useTranslation from "next-translate/useTranslation"

const AreasPage = ({
  params
}: {
  params: { countrySlug: string; provinceSlug: string; citySlug: string }
}) => {
  const { t } = useTranslation()
  const countrySlug = params.countrySlug as string
  const provinceSlug = params.provinceSlug as string
  const citySlug = params.citySlug as string

  return (
    <>
      <PageHeader title={t("common:locations_index_title")} />
      <div>
        <Areas citySlug={citySlug} />
      </div>
    </>
  )
}

export default AreasPage
