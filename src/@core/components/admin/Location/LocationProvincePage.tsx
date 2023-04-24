import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import { City, useGetProvinceQuery } from "@/generated"
import Loading from "../../shared/Loading/Loading"
import LoadingFailed from "../../shared/LoadingFailed/LoadingFailed"
import PageHeader from "../../shared/PageHeader/PageHeader"
import LocationCityCard from "./LocationCityCard"

interface ILocationProvincePage {
  provinceId: number
}

const LocationProvincePage = ({ provinceId }: ILocationProvincePage) => {
  const { isLoading, error, data } = useGetProvinceQuery(graphqlRequestClient, {
    id: provinceId
  })
  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  return (
    <>
      <PageHeader title={data?.province?.name as string} />
      <div>
        {data?.province?.cities?.map((city) => (
          <LocationCityCard
            key={city.id}
            countrySlug={"iran"}
            provinceSlug={data?.province?.slug}
            city={city as City}
          />
        ))}
      </div>
    </>
  )
}

export default LocationProvincePage
