import Cities from "@/app/admin/locations/components/Cities"

const CitiesPage = ({
  params
}: {
  params: { countrySlug: string; provinceSlug: string }
}) => {
  const countrySlug = params.countrySlug as string
  const provinceSlug = params.provinceSlug as string

  return <Cities countrySlug={countrySlug} provinceSlug={provinceSlug} />
}

export default CitiesPage
