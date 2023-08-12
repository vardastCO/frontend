"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"

import { Category, useGetVocabularyQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import PageHeader from "@core/components/shared/PageHeader"
import { Button } from "@core/components/ui/button"
import CategoryDeleteModal from "@/app/admin/vocabularies/components/CategoryDeleteModal"
import CategoryFormModal from "@/app/admin/vocabularies/components/CategoryFormModal"

import CategoryCard from "./CategoryCard"

type Props = {
  slug: string
}

const Categories = ({ slug }: Props) => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [formModalOpen, setFormModalOpen] = useState<boolean>(false)
  const [categoryToEdit, setCategoryToEdit] = useState<Category>()
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
      <CategoryFormModal
        open={formModalOpen}
        onOpenChange={(state) => {
          setCategoryToEdit(undefined)
          setCategoryToDelete(undefined)
          setFormModalOpen(state)
        }}
        category={categoryToEdit}
        vocabularyId={data.vocabulary.id}
      />
      <PageHeader title={data.vocabulary.title}>
        {session?.abilities.includes("gql.base.taxonomy.category.store") && (
          <Button size="medium" onClick={() => setFormModalOpen(true)}>
            {t("common:add_entity", { entity: t("common:category") })}
          </Button>
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
              onEditTriggered={(category) => {
                setCategoryToEdit(category)
                setFormModalOpen(true)
              }}
              onDeleteTriggered={(category) => {
                setCategoryToDelete(category)
                setDeleteModalOpen(true)
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
