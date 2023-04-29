import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import LocationNoCountryFound from "@/@core/components/admin/Location/LocationNoCountryFound"
import CategoryCard from "@/@core/components/admin/Vocabulary/CategoryCard"
import CreateCategory from "@/@core/components/admin/Vocabulary/CreateCategory"
import Loading from "@/@core/components/shared/Loading/Loading"
import LoadingFailed from "@/@core/components/shared/LoadingFailed/LoadingFailed"
import PageHeader from "@/@core/components/shared/PageHeader/PageHeader"
import AdminLayout from "@/@core/layouts/AdminLayout"
import { Category, useGetVocabularyQuery } from "@/generated"
import { NextPageWithLayout } from "@/pages/_app"
import { IconMinus, IconPlus, IconSearch } from "@tabler/icons-react"
import { GetStaticPaths } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { useTranslation } from "react-i18next"

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

const VocabularyPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common")
  const router = useRouter()
  const slug = router.query.slug as string

  const { isLoading, error, data } = useGetVocabularyQuery(
    graphqlRequestClient,
    {
      slug: slug
    }
  )

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.vocabulary.categories) return <LocationNoCountryFound />

  return (
    <>
      <PageHeader title={t("categories_index_title")}>
        <CreateCategory />
      </PageHeader>
      <div>
        <div className="flex items-center gap-6">
          <div className="w-1/2">
            <div className="input-inset">
              <div className="input-element">
                <IconSearch className="h-4 w-4 text-n-gray-400" />
              </div>
              <input
                type="text"
                className="input-field"
                placeholder={t("Search in {{ entity }}", {
                  entity: t("Categories")
                }).toString()}
              />
            </div>
          </div>
          <div className="btn-group mr-auto">
            <button className="btn-xs btn-secondary btn">
              <IconMinus className="icon" />
              <span>{t("Collapse All")}</span>
            </button>
            <button className="btn-xs btn-secondary btn">
              <IconPlus className="icon" />
              <span>{t("Expand All")}</span>
            </button>
          </div>
        </div>
        <div className="mt-12">
          <div className="flex flex-col gap-2">
            {data?.vocabulary.categories.map((category) => (
              <CategoryCard category={category as Category} key={category.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

VocabularyPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default VocabularyPage
