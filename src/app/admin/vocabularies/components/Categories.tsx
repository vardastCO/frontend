"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { useSession } from "next-auth/react"

import { Category, useGetVocabularyQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import PageHeader from "@core/components/shared/PageHeader"
import CategoryDeleteModal from "@/app/admin/vocabularies/components/CategoryDeleteModal"

import CategoryCard from "./CategoryCard"
import CreateCategory from "./CreateCategory"

type Props = {
  slug: string
}

const Categories = ({ slug }: Props) => {
  const { data: session } = useSession()
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Category>()

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
        {session?.abilities.includes("gql.base.taxonomy.category.store") && (
          <CreateCategory vocabularyId={data.vocabulary.id} />
        )}
      </PageHeader>
      {!data.vocabulary.categories.length && <NoResult entity="category" />}
      <CategoryDeleteModal
        categoryToDelete={categoryToDelete}
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
      />
      <div>
        <div className="flex flex-col gap-2">
          {data.vocabulary.categories.map((category) => (
            <CategoryCard
              category={category as Category}
              vocabularySlug={data.vocabulary.slug}
              onDeleteTriggered={(category) => {
                setDeleteModalOpen(true)
                setCategoryToDelete(category)
              }}
              key={category?.id}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Categories
