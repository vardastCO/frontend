import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import Areas from "@/app/admin/locations/components/area/Areas"

const AreasPage = async ({
  params
}: {
  params: { countrySlug: string; provinceSlug: string; citySlug: string }
}) => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.base.location.area.index")) {
    redirect("/admin")
  }

  const countrySlug = params.countrySlug as string
  const provinceSlug = params.provinceSlug as string
  const citySlug = params.citySlug as string

  return <Areas citySlug={citySlug} />
}

export default AreasPage
