"use client"

import { useState } from "react"

import { useGetAllVocabulariesQuery, Vocabulary } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import VocabularyDeleteModal from "@/app/admin/vocabularies/components/VocabularyDeleteModal"

import VocabularyCard from "./VocabularyCard"

const Vocabularies = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [vocabularyToDelete, setVocabularyToDelete] = useState<Vocabulary>()

  const { isLoading, error, data } =
    useGetAllVocabulariesQuery(graphqlRequestClient)

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.vocabularies.data) return <NoResult entity="vocabulary" />

  return (
    <>
      <VocabularyDeleteModal
        vocabularyToDelete={vocabularyToDelete}
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
      />
      <div className="flex flex-col gap-2">
        {data?.vocabularies.data.map(
          (vocabulary) =>
            vocabulary && (
              <VocabularyCard
                vocabulary={vocabulary as Vocabulary}
                onDeleteTriggered={(vocabulary) => {
                  setDeleteModalOpen(true)
                  setVocabularyToDelete(vocabulary)
                }}
                key={vocabulary.id}
              />
            )
        )}
      </div>
    </>
  )
}

export default Vocabularies
