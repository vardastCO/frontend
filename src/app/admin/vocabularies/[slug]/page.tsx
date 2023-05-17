import CreateCategory from "@/app/admin/vocabularies/components/CreateCategory"
import PageHeader from "@core/components/shared/PageHeader"
import useTranslation from "next-translate/useTranslation"
import Categories from "../components/Categories"

const CategoriesPage = ({ params }: { params: { slug: string } }) => {
  const { t } = useTranslation()
  const slug = params.slug as string

  return (
    <>
      <PageHeader title={t("categories_index_title")}>
        <CreateCategory />
      </PageHeader>
      <div>
        <Categories slug={slug} />
      </div>
    </>
  )
}

export default CategoriesPage
