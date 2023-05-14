import NoCountryFound from "@/app/admin/locations/components/NoCountryFound"
import CategoryCard from "@/app/admin/vocabularies/components/CategoryCard"
import CreateCategory from "@/app/admin/vocabularies/components/CreateCategory"
import { Category, useGetVocabularyQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import PageHeader from "@core/components/shared/PageHeader"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/navigation"

export default function VocabularyPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const slug = router.query.slug as string

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
    <>
      <PageHeader title={t("categories_index_title")}>
        <CreateCategory />
      </PageHeader>
      <div>
        <div className="flex flex-col gap-2">
          {data?.vocabulary.categories.map((category) => (
            <CategoryCard
              category={category as Category}
              vocabularySlug={data?.vocabulary.slug}
              key={category.id}
            />
          ))}
        </div>
      </div>
    </>
  )
}
