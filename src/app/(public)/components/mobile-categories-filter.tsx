"use client"

import { useContext } from "react"
import { useMediaQuery } from "@mantine/hooks"
import * as Dialog from "@radix-ui/react-dialog"
import { IconArrowRight, IconChevronLeft } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"

import { Category, Vocabulary } from "@/generated"

import { Button } from "@core/components/ui/button"
import { getCategoryQueryFn } from "@core/queryFns/categoryQueryFns"
import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import { PublicContext } from "@/app/(public)/components/public-provider"

type Props = {}

const MobileCategoriesFilter = (props: Props) => {
  const { categoriesFilterVisibilityAtom } = useContext(PublicContext)
  const [categoriesFilterVisibility, setCategoriesFilterVisibility] = useAtom(
    categoriesFilterVisibilityAtom
  )

  const isTabletOrMobile = useMediaQuery("(max-width: 640px)", true, {
    getInitialValueInEffect: false
  })

  const vocabularies = useQuery<{ vocabulary: Vocabulary }>({
    queryKey: ["vocabulary", { slug: "product_categories" }],
    queryFn: () => getVocabularyQueryFn("product_categories")
  })

  const categories = useQuery<{ category: Category }>({
    queryKey: ["category", { id: 104 }],
    queryFn: () => getCategoryQueryFn(104),
    enabled: false
  })

  return (
    isTabletOrMobile && (
      <Dialog.Root
        open={categoriesFilterVisibility}
        onOpenChange={setCategoriesFilterVisibility}
      >
        <Dialog.Content className="fixed inset-0 z-40 h-[calc(100%-calc(64px+var(--safe-aera-inset-bottom)))] overflow-y-auto overscroll-contain bg-white">
          <div>
            <div className="sticky top-0 border-b border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setCategoriesFilterVisibility(false)}
                  variant="ghost"
                  size="small"
                  iconOnly
                >
                  <IconArrowRight className="h-5 w-5" />
                </Button>
                <div className="font-bold text-gray-800">همه دسته‌بندی‌ها</div>
              </div>
            </div>
            <div className="p-4">
              <ul className="flex flex-col divide-y divide-gray-200">
                {vocabularies?.data?.vocabulary.categories.map((category) => (
                  <li
                    key={category?.id}
                    className="flex items-center justify-between py-3"
                  >
                    {category?.title}
                    <IconChevronLeft className="h-4 w-4 text-gray-400" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    )
  )
}

export default MobileCategoriesFilter
