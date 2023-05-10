import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import NoCountryFound from "@/@core/components/admin/Location/NoCountryFound"
import CategoryCard from "@/@core/components/admin/Vocabulary/CategoryCard"
import CreateCategory from "@/@core/components/admin/Vocabulary/CreateCategory"
import Loading from "@/@core/components/shared/Loading/Loading"
import LoadingFailed from "@/@core/components/shared/LoadingFailed/LoadingFailed"
import PageHeader from "@/@core/components/shared/PageHeader/PageHeader"
import AdminLayout from "@/@core/layouts/AdminLayout"
import { Category, useGetVocabularyQuery } from "@/generated"
import { NextPageWithLayout } from "@/pages-old/_app"
import { GetStaticPaths } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { useRouter } from "next/router"
import { ReactElement } from "react"

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
  if (!data?.vocabulary.categories) return <NoCountryFound />

  return (
    <>
      <PageHeader title={t("categories_index_title")}>
        <CreateCategory />
      </PageHeader>
      <div>
        <div className="flex flex-col gap-2">
          {data?.vocabulary.categories.map((category) => (
            <CategoryCard
              category={category as Category}
              vocabularySlug={data?.vocabulary.slug}
              key={category.id}
            />
          ))}
        </div>
      </div>
    </>
  )
}

VocabularyPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default VocabularyPage
