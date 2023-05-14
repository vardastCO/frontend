import NoCountryFound from "@/app/admin/locations/components/NoCountryFound"
import CreateCategory from "@/app/admin/vocabularies/components/CreateCategory"
import VocabularyCard from "@/app/admin/vocabularies/components/VocabularyCard"
import { Vocabulary, useGetAllVocabulariesQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import PageHeader from "@core/components/shared/PageHeader"
import { IconMinus, IconPlus, IconSearch } from "@tabler/icons-react"
import useTranslation from "next-translate/useTranslation"

export default function VocabulariesPage() {
  const { t } = useTranslation()
  const { isLoading, error, data } =
    useGetAllVocabulariesQuery(graphqlRequestClient)

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.vocabularies) return <NoCountryFound />

  return (
    <>
      <PageHeader title={t("vocabularies.indexTitle")}>
        <CreateCategory />
      </PageHeader>
      <div>
        <div className="flex items-center gap-6">
          <div className="w-1/2">
            <div className="form-control">
              <div className="input-inset">
                <span className="input-element">
                  <IconSearch className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  className="input-field"
                  placeholder={t("Search in {{ entity }}", {
                    entity: t("Categories")
                  }).toString()}
                />
              </div>
            </div>
          </div>
          <div className="btn-group mr-auto">
            <button className="btn-secondary btn">
              <IconMinus className="icon" />
              <span>{t("Collapse All")}</span>
            </button>
            <button className="btn-secondary btn">
              <IconPlus className="icon" />
              <span>{t("Expand All")}</span>
            </button>
          </div>
        </div>
        <div className="mt-12">
          <div className="flex flex-col gap-2">
            {data?.vocabularies.map((vocabulary) => (
              <VocabularyCard
                vocabulary={vocabulary as Vocabulary}
                key={vocabulary.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
