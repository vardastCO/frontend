import useTranslation from "next-translate/useTranslation"
import Categories from "../components/Categories"

const CategoriesPage = ({ params }: { params: { slug: string } }) => {
  const { t } = useTranslation()
  const slug = params.slug as string

  return <Categories slug={slug} />
}

export default CategoriesPage
