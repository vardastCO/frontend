import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import { Province, useGetCountryQuery } from "@/generated"
import Loading from "../../shared/Loading/Loading"
import LoadingFailed from "../../shared/LoadingFailed/LoadingFailed"
import PageHeader from "../../shared/PageHeader/PageHeader"
import LocationProvinceCard from "./LocationProvinceCard"

interface ILocationCountryPage {
  countryId: number
}

const LocationCountryPage = ({ countryId }: ILocationCountryPage) => {
  const { isLoading, error, data } = useGetCountryQuery(graphqlRequestClient, {
    id: countryId
  })
  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  return (
    <>
      <PageHeader title={data?.country?.name as string} />
      <div>
        {data?.country?.provinces?.map((province) => (
          <LocationProvinceCard
            key={province.id}
            countrySlug={data?.country?.nameEn}
            province={province as Province}
          />
        ))}
      </div>
    </>
  )
}

export default LocationCountryPage
