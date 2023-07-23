import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { GetVocabularyQuery } from "@/generated"

import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"

const nav = [
  { title: "مصالح ساختمای" },
  { title: "تاسیسات" },
  { title: "ابزار و یراق" },
  { title: "درب و پنجره" },
  { title: "آهن آلات" }
]
const Navigation = () => {
  const { data } = useQuery<GetVocabularyQuery>({
    queryKey: ["vocabulary", { slug: "product_categories" }],
    queryFn: () => getVocabularyQueryFn("product_categories")
  })

  if (!data) return <></>

  return (
    <ol className="hide-scrollbar flex items-center gap-1 overflow-x-auto">
      {data.vocabulary.categories.map(
        (category) =>
          category && (
            <li key={category.id}>
              <Link
                href={`/search/${category.id}/${category.title}`}
                className="inline-flex whitespace-nowrap px-3 py-2"
              >
                {category.title}
              </Link>
            </li>
          )
      )}
    </ol>
  )
}

export default Navigation
