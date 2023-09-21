"use client"

import { useContext, useEffect, useState } from "react"
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

const ProductLoader = () => {
  return (
    <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center rounded-2xl bg-alpha-800 bg-opacity-10 text-primary-600 backdrop-blur-sm">
      <span className="animate-spin">
        <LucideLoader2 className="h-8 w-8" />
      </span>
    </div>
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

  if (vocabularies.isLoading)
    return (
      <div className="flex animate-pulse flex-col gap-3 p">
        <div className="h-8 w-[80%] rounded-md bg-alpha-200"></div>
        <div className="h-8 w-full rounded-md bg-alpha-200"></div>
        <div className="h-8 w-[90%] rounded-md bg-alpha-200"></div>
      </div>
    )
  if (!vocabularies.data) return <></>

  return (
    <ul className="grid h-full grid-cols-2 grid-rows-2 gap-4 divide-alpha-200 p-6">
      {vocabularies.data.vocabulary.categories.map(
        (category) =>
          category && (
            <li
              key={category.id}
              className={`flex h-[calc(60vw)] flex-col gap-3 rounded-2xl bg-white p`}
              onClick={() => onCategoryChanged(category as Category)}
            >
              <div
                id={`category-image-${category.id}`}
                className="relative w-full flex-1 flex-shrink-0 bg-center bg-no-repeat align-middle opacity-0 duration-1000 ease-out lg:w-full"
              >
                {loader === category.id ? <ProductLoader /> : <></>}
                <Image
                  src={`/images/categories/${category.id}.png`}
                  alt={category.title}
                  fill
                  // sizes="full, full"
                  className="h-full object-contain"
                  loading="eager"
                  onLoadingComplete={() => {
                    const div = document.getElementById(
                      `category-image-${category.id}`
                    )
                    if (div) {
                      div.className = div.className + " opacity-100"
                    }
                  }}
                />
              </div>
              <div className="flex-start flex h-1/4 flex-col gap-y-2">
                <p className="text-sm text-primary">{`${digitsEnToFa(
                  addCommas(category.productsCount)
                )} کالا`}</p>
                <h2 className="font-bold">{category.title}</h2>
              </div>
            </li>
          )
      )}
    </ul>
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
  if (categoriesQuery.isLoading)
    return (
      <div className="flex animate-pulse flex-col gap-3 p">
        <div className="h-8 w-[80%] rounded-md bg-alpha-200"></div>
        <div className="h-8 w-full rounded-md bg-alpha-200"></div>
        <div className="h-8 w-[90%] rounded-md bg-alpha-200"></div>
      </div>
    )
  if (!categoriesQuery.data) return <></>

  const data = categoriesQuery.data

  return (
    <ul className="grid h-full grid-cols-2 gap-4 divide-alpha-200 px-6 py">
      {data.category.children.map(
        (category) =>
          category && (
            <li
              key={category.id}
              className={`gap-4 rounded-2xl bg-white px-2 py-4`}
              onClick={() => onCategoryChanged(category as Category, false)}
            >
              <div
                id={`category-image-${category.id}`}
                className="relative h-[calc(30vw)] w-full flex-shrink-0 bg-center bg-no-repeat align-middle opacity-0 duration-1000 ease-out lg:w-full"
              >
                {loader === category.id ? <ProductLoader /> : <></>}
                <Image
                  src={"/images/blank.png"}
                  alt={category.title}
                  fill
                  sizes="(max-width: 65vw) full, full"
                  className="object-contain"
                  loading="eager"
                  onLoadingComplete={() => {
                    const div = document.getElementById(
                      `category-image-${category.id}`
                    )
                    if (div) {
                      div.className = div.className + " opacity-100"
                    }
                  }}
                />
              </div>
              <div className="my-auto flex flex-col">
                <h2 className="font-semibold">{category.title}</h2>
                <p className="text-sm text-primary">{`${digitsEnToFa(
                  addCommas(category.productsCount)
                )} کالا`}</p>
              </div>
            </li>
            // <li
            //   key={category.id}
            //   className={`grid grid-cols-4 gap-4 rounded-xl bg-white px-2 py-4`}
            //   onClick={() => onCategoryChanged(category as Category, true)}
            // >
            //   <div
            //     id={`category-image-${category.id}`}
            //     className="relative col-span-2 min-h-[calc(22vw)] w-full flex-shrink-0 bg-center bg-no-repeat align-middle opacity-0 duration-1000 ease-out lg:w-full"
            //   >
            //     <Image
            //       src={"/images/sample.png"}
            //       alt={category.title}
            //       fill
            //       sizes="(max-width: 65vw) full, full"
            //       className="object-contain"
            //       loading="eager"
            //       onLoadingComplete={() => {
            //         const div = document.getElementById(
            //           `category-image-${category.id}`
            //         )
            //         if (div) {
            //           div.className = div.className + " opacity-100"
            //         }
            //       }}
            //     />
            //   </div>
            //   <div className="my-auto flex flex-col">
            //     <h2 className="font-semibold">{category.title}</h2>
            //     <p className="text-sm-600 text-error">{`${digitsEnToFa(
            //       addCommas(category.productsCount)
            //     )} کالا`}</p>
            //   </div>
            //   <div className="my-auto mr-auto">
            //     {/* <p className="rounded-full bg-green-400 px-2 text-left text-white">
            //       جدید
            //     </p> */}
            //   </div>
            // </li>
          )
      )}
    </ul>
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
