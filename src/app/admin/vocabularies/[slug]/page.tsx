import Categories from "../components/Categories"

const CategoriesPage = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug as string

  return <Categories slug={slug} />
}

export default CategoriesPage
