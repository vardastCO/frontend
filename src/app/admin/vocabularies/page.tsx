import useTranslation from "next-translate/useTranslation"

import PageHeader from "@core/components/shared/PageHeader"

import CreateVocavulary from "./components/CreateVocabulary"
import Vocabularies from "./components/Vocabularies"

const VocabulariesPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader title={t("common:vocabularies_index_title")}>
        <CreateVocavulary />
      </PageHeader>
      <div>
        <Vocabularies />
      </div>
    </>
  )
}

export default VocabulariesPage
