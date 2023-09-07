import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"

import Categories from "../components/Categories"

const CategoriesPage = async ({ params }: { params: { slug: string } }) => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.base.taxonomy.category.index")) {
    redirect("/admin")
  }

  const slug = params.slug as string

  return <Categories slug={slug} />
}

export default CategoriesPage
