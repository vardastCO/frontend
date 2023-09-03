import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import Cities from "@/app/admin/locations/components/city/Cities"

const CitiesPage = async ({
  params
}: {
  params: { countrySlug: string; provinceSlug: string }
}) => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.base.location.city.index")) {
    redirect("/admin")
  }

  const countrySlug = params.countrySlug as string
  const provinceSlug = params.provinceSlug as string

  return <Cities countrySlug={countrySlug} provinceSlug={provinceSlug} />
}

export default CitiesPage
