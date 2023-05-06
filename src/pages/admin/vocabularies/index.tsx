import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import NoCountryFound from "@/@core/components/admin/Location/NoCountryFound"
import CreateCategory from "@/@core/components/admin/Vocabulary/CreateCategory"
import VocabularyCard from "@/@core/components/admin/Vocabulary/VocabularyCard"
import Loading from "@/@core/components/shared/Loading/Loading"
import LoadingFailed from "@/@core/components/shared/LoadingFailed/LoadingFailed"
import PageHeader from "@/@core/components/shared/PageHeader/PageHeader"
import AdminLayout from "@/@core/layouts/AdminLayout"
import { withSessionSsr } from "@/@core/lib/withSession"
import { Vocabulary, useGetAllVocabulariesQuery } from "@/generated"
import { NextPageWithLayout } from "@/pages/_app"
import { IconMinus, IconPlus, IconSearch } from "@tabler/icons-react"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async function getServerSideProps({ locale, req }) {
    const user = req.session.user
    graphqlRequestClient.setHeader(
      "authorization",
      `Bearer ${user.login.accessToken}`
    )

    return {
      props: {
        user: req.session.user,
        ...(await serverSideTranslations(locale as string))
      }
    }
  }
)

const VocabulariesPage: NextPageWithLayout = ({
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation("common")

  const { isLoading, error, data } = useGetAllVocabulariesQuery(
    graphqlRequestClient.setHeader(
      "authorization",
      `Bearer ${user.login.accessToken}`
    )
  )

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.vocabularies) return <NoCountryFound />

  return (
    <>
      <PageHeader title={t("categories_index_title")}>
        <CreateCategory />
      </PageHeader>
      <div>
        <div className="flex items-center gap-6">
          <div className="w-1/2">
            <div className="form-control form-control-sm">
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
            <button className="btn-sm btn-secondary btn">
              <IconMinus className="icon" />
              <span>{t("Collapse All")}</span>
            </button>
            <button className="btn-sm btn-secondary btn">
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

VocabulariesPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default VocabulariesPage
