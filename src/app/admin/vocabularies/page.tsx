import CreateCategory from "@/app/admin/vocabularies/components/CreateCategory"
import PageHeader from "@core/components/shared/PageHeader"
import { IconMinus, IconPlus, IconSearch } from "@tabler/icons-react"
import useTranslation from "next-translate/useTranslation"
import Vocabularies from "./components/Vocabularies"

const VocabulariesPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader title={t("common:vocabularies_index_title")}>
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
                  placeholder={t("common:search_in_entity", {
                    entity: t("common:categories")
                  }).toString()}
                />
              </div>
            </div>
          </div>
          <div className="btn-group mr-auto">
            <button className="btn-secondary btn">
              <IconMinus className="icon" />
              <span>{t("common:collapse_all")}</span>
            </button>
            <button className="btn-secondary btn">
              <IconPlus className="icon" />
              <span>{t("common:expand_all")}</span>
            </button>
          </div>
        </div>
        <div className="mt-12">
          <Vocabularies />
        </div>
      </div>
    </>
  )
}

export default VocabulariesPage
