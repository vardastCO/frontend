import { Category, useGetVocabularyQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoCountryFound from "../../locations/components/NoCountryFound"
import CategoryCard from "./CategoryCard"

type Props = {
  slug: string
}

const Categories = ({ slug }: Props) => {
  const { isLoading, error, data } = useGetVocabularyQuery(
    graphqlRequestClient,
    {
      slug: slug
    }
  )

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.vocabulary.categories) return <NoCountryFound />
  return (
    <div className="flex flex-col gap-2">
      {data?.vocabulary.categories.map((category) => (
        <CategoryCard
          category={category as Category}
          vocabularySlug={data?.vocabulary.slug}
          key={category.id}
        />
      ))}
    </div>
  )
}

export default Categories
