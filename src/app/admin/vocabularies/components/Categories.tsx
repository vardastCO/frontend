"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { UseQueryResult } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"

import { Category, GetCategoryQuery, useGetVocabularyQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import PageHeader from "@core/components/shared/PageHeader"
import { Button } from "@core/components/ui/button"
import CategoryDeleteModal from "@/app/admin/vocabularies/components/CategoryDeleteModal"
import CategoryFormModal from "@/app/admin/vocabularies/components/CategoryFormModal"
import EditCategoryAttributeModal from "@/app/admin/vocabularies/components/EditCategoryAttributeModal"

import CategoryCard from "./CategoryCard"

export type IGetCategoryQueryResult = UseQueryResult<
  GetCategoryQuery,
  unknown
> | null

type Props = {
  slug: string
}

const Categories = ({ slug }: Props) => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [formModalOpen, setFormModalOpen] = useState<boolean>(false)
  const [editCategoryAttributeModal, setEditCategoryAttributeModal] =
    useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState<Category>()
  const [attributeCategoryToEdit, setAttributeCategoryToEdit] =
    useState<Category>()
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Category>()
  const [getCategoryQueryResult, setGetCategoryQueryResult] =
    useState<IGetCategoryQueryResult>(null)

  const vocabularyQuery = useGetVocabularyQuery(graphqlRequestClient, {
    slug: slug
  })

  if (vocabularyQuery.isLoading) return <Loading />
  if (vocabularyQuery.error) return <LoadingFailed />
  if (!vocabularyQuery.data) notFound()

  return (
    <>
      <EditCategoryAttributeModal
        open={editCategoryAttributeModal}
        category={attributeCategoryToEdit}
        onOpenChange={(state) => {
          setEditCategoryAttributeModal(state)
        }}
      />
      <CategoryFormModal
        getCategoryQueryResult={getCategoryQueryResult}
        open={formModalOpen}
        onOpenChange={(state) => {
          setCategoryToEdit(undefined)
          setCategoryToDelete(undefined)
          setFormModalOpen(state)
        }}
        category={categoryToEdit}
        vocabularyId={vocabularyQuery.data.vocabulary.id}
      />
      <PageHeader title={vocabularyQuery.data.vocabulary.title}>
        {session?.abilities.includes("gql.base.taxonomy.category.store") && (
          <Button size="medium" onClick={() => setFormModalOpen(true)}>
            {t("common:add_entity", { entity: t("common:category") })}
          </Button>
        )}
      </PageHeader>
      {!vocabularyQuery.data.vocabulary.categories.length && (
        <NoResult entity="category" />
      )}
      <CategoryDeleteModal
        getCategoryQueryResult={getCategoryQueryResult}
        categoryToDelete={categoryToDelete}
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
      />
      <div>
        <div className="flex flex-col gap-2">
          {vocabularyQuery.data.vocabulary.categories.map((category) => (
            <CategoryCard
              category={category as Category}
              setGetCategoryQueryResult={setGetCategoryQueryResult}
              vocabularySlug={vocabularyQuery.data.vocabulary.slug}
              onEditTriggered={(category) => {
                setCategoryToEdit(category)
                setFormModalOpen(true)
              }}
              onEditAttributes={(category) => {
                setAttributeCategoryToEdit(category)
                setEditCategoryAttributeModal(true)
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
