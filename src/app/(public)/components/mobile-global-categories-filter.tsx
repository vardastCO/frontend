"use client"

import { PropsWithChildren, useContext, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { LucideLoader2 } from "lucide-react"

import { Category, GetCategoryQuery, GetVocabularyQuery } from "@/generated"

import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"
import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import { PublicContext } from "@/app/(public)/components/public-provider"

import MobileHeader from "./header/MobileHeader"

type ILoader = null | number

interface VocabulariesListProps {
  loader: ILoader
  onCategoryChanged: (_: Category) => void
}

interface IVocabularyItem {
  title: string
  isSubCategory?: boolean
  id: number
  src: string
  productsCount: number
  loader: ILoader
  onClick: (_?: any) => void
}

const ProductLoader = () => {
  return (
    <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center rounded-2xl bg-alpha-800 bg-opacity-10 text-primary-600 backdrop-blur-sm">
      <span className="animate-spin">
        <LucideLoader2 className="h-8 w-8" />
      </span>
    </div>
  )
}

const VocabularySkeleton = ({ isSubCategory }: { isSubCategory?: boolean }) => {
  return (
    <li
      className={`${
        isSubCategory ? "h-[calc(40vw)]" : "h-[calc(60vw)]"
      } flex animate-pulse flex-col gap-3 rounded-2xl bg-alpha-200 p-3`}
    ></li>
  )
}

const VocabularySkeletonContainer = ({
  isSubCategory
}: {
  isSubCategory?: boolean
}) => {
  return (
    <ul className="grid h-full grid-cols-2 grid-rows-2 gap-4 divide-alpha-200 p-6">
      {[...Array(7)].map((_, index) => (
        <VocabularySkeleton isSubCategory={isSubCategory} key={index} />
      ))}
    </ul>
  )
}

const VocabularyItem = ({
  onClick,
  title,
  src,
  productsCount,
  id,
  loader,
  isSubCategory
}: IVocabularyItem) => {
  return (
    <li
      className={`${
        isSubCategory ? "h-[calc(40vw)]" : "h-[calc(60vw)]"
      } flex flex-col gap-3 rounded-2xl bg-alpha-100 p-3`}
      onClick={onClick}
    >
      <div className="flex-start flex flex-col gap-y-2">
        <p className="truncate whitespace-pre text-sm font-semibold">{title}</p>
        <p className="text-xs text-primary">{`${digitsEnToFa(
          addCommas(productsCount)
        )} کالا`}</p>
      </div>
      <div
        id={`category-image-${id}`}
        className="relative w-full flex-1 flex-shrink-0 bg-center bg-no-repeat align-middle opacity-0 duration-1000 ease-out lg:w-full"
      >
        {loader === id ? <ProductLoader /> : <></>}
        <Image
          src={src}
          alt={title}
          fill
          // sizes="full, full"
          className="h-full object-contain"
          loading="eager"
          onLoadingComplete={() => {
            const div = document.getElementById(`category-image-${id}`)
            if (div) {
              div.className = div.className + " opacity-100"
            }
          }}
        />
      </div>
    </li>
  )
}

const VocabularyListLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ul className="grid h-full grid-cols-2 grid-rows-2 gap-4 divide-alpha-200 p-6">
      {children}
    </ul>
  )
}

const VocabulariesList = ({
  onCategoryChanged,
  loader
}: VocabulariesListProps) => {
  const vocabularies = useQuery<GetVocabularyQuery>({
    queryKey: ["vocabulary", { slug: "product_categories" }],
    queryFn: () => getVocabularyQueryFn("product_categories")
  })

  if (vocabularies.isLoading) {
    return <VocabularySkeletonContainer />
  }

  if (!vocabularies.data) {
    return <></>
  }

  return (
    <VocabularyListLayout>
      {vocabularies.data.vocabulary.categories.map(
        (category) =>
          category && (
            <VocabularyItem
              key={category.id}
              loader={loader}
              onClick={() => onCategoryChanged(category as Category)}
              title={category.title}
              productsCount={category.productsCount}
              id={category.id}
              src={
                (category?.imageCategory[0]?.file.presignedUrl
                  ?.url as string) ?? `/images/categories/${category.id}.png`
              }
            />
          )
      )}
    </VocabularyListLayout>
  )
}

interface CategoriesListProps {
  categoryId: number
  loader: ILoader
  onCategoryChanged: (_: Category, __: boolean) => void
}

const CategoriesList = ({
  onCategoryChanged,
  categoryId,
  loader
}: CategoriesListProps) => {
  const categoriesQuery = useQuery<GetCategoryQuery>({
    queryKey: ["category", { id: categoryId }],
    queryFn: () => getCategoryQueryFn(categoryId)
  })
  if (categoriesQuery.isLoading) {
    return <VocabularySkeletonContainer isSubCategory />
  }
  if (!categoriesQuery.data) {
    return <></>
  }

  return (
    <VocabularyListLayout>
      {categoriesQuery.data.category.children.map(
        (category) =>
          category && (
            <VocabularyItem
              key={category.id}
              isSubCategory
              loader={loader}
              onClick={() => onCategoryChanged(category as Category, false)}
              title={category.title}
              productsCount={category.productsCount}
              id={category.id}
              src={
                (category?.imageCategory[0]?.file.presignedUrl
                  ?.url as string) ?? `/images/blank.png`
              }
            />
          )
      )}
    </VocabularyListLayout>
  )
}

const MobileGlobalCategoriesFilter = () => {
  const [loader, setLoader] = useState<ILoader>(null)
  const { push } = useRouter()
  const { globalCategoriesFilterVisibilityAtom, showNavigationBackButton } =
    useContext(PublicContext)
  const [
    globalCategoriesFilterVisibility,
    setGlobalCategoriesFilterVisibility
  ] = useAtom(globalCategoriesFilterVisibilityAtom)
  // eslint-disable-next-line no-unused-vars
  const [_, setShowNavigationBackButton] = useAtom(showNavigationBackButton)
  const [previousCategory, setPreviousCategory] = useState<Category | null>(
    null
  )
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )

  useEffect(() => {
    if (!globalCategoriesFilterVisibility) {
      setSelectedCategory(null)
      setLoader(null)
      setShowNavigationBackButton(false)
      setPreviousCategory(null)
    }
  }, [globalCategoriesFilterVisibility, setShowNavigationBackButton])

  return (
    <>
      <div className="flex flex-col border-alpha-200">
        <MobileHeader
          title={selectedCategory ? selectedCategory.title : "دسته‌بندی‌ها"}
          hasBack={{
            onClick: () => {
              if (!selectedCategory) setGlobalCategoriesFilterVisibility(false)
              if (selectedCategory && !previousCategory) {
                setSelectedCategory(null)
                setLoader(null)
                setShowNavigationBackButton(false)
              }
              if (selectedCategory && previousCategory) {
                setSelectedCategory(previousCategory)
                setShowNavigationBackButton(true)
                setPreviousCategory(selectedCategory.parentCategory || null)
              }
            },
            hidden: true
          }}
        />
        {/* <div className="grid grid-cols-5 items-center gap-2 border-b">
          <Button
            onClick={() => {
              if (!selectedCategory) setGlobalCategoriesFilterVisibility(false)
              if (selectedCategory && !previousCategory)
                setSelectedCategory(null)
              if (selectedCategory && previousCategory) {
                setSelectedCategory(previousCategory)
                setPreviousCategory(selectedCategory.parentCategory || null)
              }
            }}
            variant="ghost"
            className="ml-auto px-6"
            size="small"
            iconOnly
          >
            <LucideArrowRight className="h-5 w-5" />
          </Button>
          <div className="col-span-3 px-6 text-center font-bold text-alpha-800">
            {selectedCategory ? selectedCategory.title : "دسته‌بندی‌ها"}
          </div>
          <div></div>
        </div> */}
        {selectedCategory ? (
          <CategoriesList
            loader={loader}
            onCategoryChanged={(category, force) => {
              category.childrenCount > 0 && !force
                ? (setPreviousCategory(selectedCategory),
                  setSelectedCategory(category),
                  setShowNavigationBackButton(true),
                  setLoader(null))
                : (setGlobalCategoriesFilterVisibility(false),
                  setLoader(category.id),
                  push(`/search/${category.id}/${category.title}`))
            }}
            categoryId={selectedCategory.id}
          />
        ) : (
          <VocabulariesList
            loader={loader}
            onCategoryChanged={(category) => {
              category.childrenCount > 0
                ? (setSelectedCategory(category),
                  setShowNavigationBackButton(true),
                  setLoader(null))
                : (setGlobalCategoriesFilterVisibility(false),
                  setLoader(category.id),
                  push(`/search/${category.id}/${category.title}`))
            }}
          />
        )}
      </div>
    </>
  )
}

export default MobileGlobalCategoriesFilter
