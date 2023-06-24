"use client"

import { useGetAllVocabulariesQuery, Vocabulary } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"

import VocabularyCard from "./VocabularyCard"

const Vocabularies = () => {
  const { isLoading, error, data } =
    useGetAllVocabulariesQuery(graphqlRequestClient)

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.vocabularies) return <NoResult entity="vocabulary" />

  return (
    <div className="flex flex-col gap-2">
      {data?.vocabularies.map((vocabulary) => (
        <VocabularyCard
          vocabulary={vocabulary as Vocabulary}
          key={vocabulary.id}
        />
      ))}
    </div>
  )
}

export default Vocabularies
