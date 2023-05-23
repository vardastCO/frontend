"use client"

import { Category, useGetVocabularyQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import PageHeader from "@core/components/shared/PageHeader"
import useTranslation from "next-translate/useTranslation"
import { notFound } from "next/navigation"
import CategoryCard from "./CategoryCard"
import CreateCategory from "./CreateCategory"

type Props = {
  slug: string
}

const Categories = ({ slug }: Props) => {
  const { t } = useTranslation()
  const { isLoading, error, data } = useGetVocabularyQuery(
    graphqlRequestClient,
    {
      slug: slug
    }
  )

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return (
    <>
      <PageHeader title={data.vocabulary.title}>
        <CreateCategory vocabularyId={data.vocabulary.id} />
      </PageHeader>
      {!data.vocabulary.categories.length && <NoResult entity="category" />}
      <div>
        <div className="flex flex-col gap-2">
          {data.vocabulary.categories.map((category) => (
            <CategoryCard
              category={category as Category}
              vocabularySlug={data.vocabulary.slug}
              key={category?.id}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Categories
