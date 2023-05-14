import Cities from "@/app/admin/locations/components/Cities"
import CreateCity from "@/app/admin/locations/components/CreateCity"
import PageHeader from "@core/components/shared/PageHeader"
import useTranslation from "next-translate/useTranslation"

export default function LocationsIndex({
  params
}: {
  params: { countrySlug: string; provinceSlug: string }
}) {
  const { t } = useTranslation()
  const countrySlug = params.countrySlug as string
  const provinceSlug = params.provinceSlug as string

  return (
    <>
      <PageHeader title={t("locations_index_title")}>
        <CreateCity provinceId={0} />
      </PageHeader>
      <div>
        <Cities countrySlug={countrySlug} provinceSlug={provinceSlug} />
      </div>
    </>
  )
}
