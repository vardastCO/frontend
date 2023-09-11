"use client"

import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import * as Dialog from "@radix-ui/react-dialog"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { LucideArrowRight, LucideChevronLeft } from "lucide-react"

import { Category, GetCategoryQuery, GetVocabularyQuery } from "@/generated"

import { Button } from "@core/components/ui/button"
import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"
import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import { PublicContext } from "@/app/(public)/components/public-provider"

interface VocabulariesListProps {
  onCategoryChanged: (category: Category) => void
}

const VocabulariesList = ({ onCategoryChanged }: VocabulariesListProps) => {
  const vocabularies = useQuery<GetVocabularyQuery>({
    queryKey: ["vocabulary", { slug: "product_categories" }],
    queryFn: () => getVocabularyQueryFn("product_categories")
  })

  if (vocabularies.isLoading)
    return (
      <div className="flex animate-pulse flex-col gap-3">
        <div className="h-8 w-[80%] rounded-md bg-gray-200"></div>
        <div className="h-8 w-full rounded-md bg-gray-200"></div>
        <div className="h-8 w-[90%] rounded-md bg-gray-200"></div>
      </div>
    )
  if (!vocabularies.data) return <></>

  return (
    <ul className="flex flex-col divide-y divide-gray-200">
      {vocabularies.data.vocabulary.categories.map(
        (category) =>
          category && (
            <li
              key={category.id}
              className="flex items-center justify-between py-3"
              onClick={() => onCategoryChanged(category as Category)}
            >
              {`${category.title} (${category.productsCount})`}
              {category.childrenCount > 0 && (
                <LucideChevronLeft className="h-4 w-4 text-gray-400" />
              )}
            </li>
          )
      )}
    </ul>
  )
}

interface CategoriesListProps {
  categoryId: number
  onCategoryChanged: (category: Category, force: boolean) => void
}

const CategoriesList = ({
  onCategoryChanged,
  categoryId
}: CategoriesListProps) => {
  const categoriesQuery = useQuery<GetCategoryQuery>({
    queryKey: ["category", { id: categoryId }],
    queryFn: () => getCategoryQueryFn(categoryId)
  })
  if (categoriesQuery.isLoading)
    return (
      <div className="flex animate-pulse flex-col gap-3">
        <div className="h-8 w-[80%] rounded-md bg-gray-200"></div>
        <div className="h-8 w-full rounded-md bg-gray-200"></div>
        <div className="h-8 w-[90%] rounded-md bg-gray-200"></div>
      </div>
    )
  if (!categoriesQuery.data) return <></>

  const data = categoriesQuery.data

  return (
    <ul className="flex flex-col divide-y divide-gray-200">
      <li
        className="flex items-center justify-between py-3 font-medium"
        onClick={() => onCategoryChanged(data.category as Category, true)}
      >
        {`نمایش تمام کالاهای ${data.category.title}`}
      </li>
      {data.category.children.map(
        (category) =>
          category && (
            <li
              key={category.id}
              className="flex items-center justify-between py-3"
              onClick={() => onCategoryChanged(category as Category, false)}
            >
              {`${category.title} (${category.productsCount})`}
              {category.childrenCount > 0 && (
                <LucideChevronLeft className="h-4 w-4 text-gray-400" />
              )}
            </li>
          )
      )}
    </ul>
  )
}

const MobileGlobalCategoriesFilter = () => {
  const { push } = useRouter()
  const { globalCategoriesFilterVisibilityAtom } = useContext(PublicContext)
  const [
    globalCategoriesFilterVisibility,
    setGlobalCategoriesFilterVisibility
  ] = useAtom(globalCategoriesFilterVisibilityAtom)
  const [previousCategory, setPreviousCategory] = useState<Category | null>(
    null
  )
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )

  useEffect(() => {
    if (!globalCategoriesFilterVisibility) {
      setSelectedCategory(null)
      setPreviousCategory(null)
    }
  }, [globalCategoriesFilterVisibility])

  return (
    <Dialog.Root
      open={globalCategoriesFilterVisibility}
      onOpenChange={setGlobalCategoriesFilterVisibility}
    >
      <Dialog.Content className="fixed inset-0 z-40 h-[calc(100%-calc(64px+var(--safe-area-inset-bottom)))] overflow-y-auto overscroll-contain bg-white">
        <div>
          <div className="sticky top-0 border-b border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => {
                  if (!selectedCategory)
                    setGlobalCategoriesFilterVisibility(false)
                  if (selectedCategory && !previousCategory)
                    setSelectedCategory(null)
                  if (selectedCategory && previousCategory) {
                    setSelectedCategory(previousCategory)
                    setPreviousCategory(selectedCategory.parentCategory || null)
                  }
                }}
                variant="ghost"
                size="small"
                iconOnly
              >
                <LucideArrowRight className="h-5 w-5" />
              </Button>
              <div className="font-bold text-gray-800">
                {selectedCategory ? selectedCategory.title : "همه دسته‌بندی‌ها"}
              </div>
            </div>
          </div>
          <div className="p-4">
            {selectedCategory ? (
              <CategoriesList
                onCategoryChanged={(category, force) => {
                  category.childrenCount > 0 && !force
                    ? (setPreviousCategory(selectedCategory),
                      setSelectedCategory(category))
                    : (setGlobalCategoriesFilterVisibility(false),
                      push(`/search/${category.id}/${category.title}`))
                }}
                categoryId={selectedCategory.id}
              />
            ) : (
              <VocabulariesList
                onCategoryChanged={(category) => {
                  category.childrenCount > 0
                    ? setSelectedCategory(category)
                    : (setGlobalCategoriesFilterVisibility(false),
                      push(`/search/${category.id}/${category.title}`))
                }}
              />
            )}
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default MobileGlobalCategoriesFilter
