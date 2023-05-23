import Provinces from "../../components/Provinces"

const ProvincesPage = ({ params }: { params: { countrySlug: string } }) => {
  const countrySlug = params.countrySlug as string

  return <Provinces countrySlug={countrySlug} />
}

export default ProvincesPage
