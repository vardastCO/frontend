import Areas from "@/app/admin/locations/components/Areas"

const AreasPage = ({
  params
}: {
  params: { countrySlug: string; provinceSlug: string; citySlug: string }
}) => {
  const countrySlug = params.countrySlug as string
  const provinceSlug = params.provinceSlug as string
  const citySlug = params.citySlug as string

  return <Areas citySlug={citySlug} />
}

export default AreasPage
