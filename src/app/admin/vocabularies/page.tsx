import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"

import Vocabularies from "./components/Vocabularies"

const VocabulariesPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.abilities.includes("gql.base.taxonomy.vocabulary.index")) {
    redirect("/admin")
  }

  return <Vocabularies />
}

export default VocabulariesPage
