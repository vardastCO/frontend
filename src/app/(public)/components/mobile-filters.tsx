"use client"

import { useContext } from "react"
import { useParams } from "next/navigation"
import * as Dialog from "@radix-ui/react-dialog"
import { IconArrowRight } from "@tabler/icons-react"
import { useAtom } from "jotai"

import { useGetFilterableAttributesQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/ui/button"
import { Checkbox } from "@core/components/ui/checkbox"
import { Label } from "@core/components/ui/label"
import FilterBlock from "@/app/(public)/components/filter-block"
import { PublicContext } from "@/app/(public)/components/public-provider"

type MobileFiltersProps = {}

const MobileFilters = (props: MobileFiltersProps) => {
  const { slug } = useParams()
  const { filtersVisibilityAtom } = useContext(PublicContext)
  const [filtersVisibility, setFiltersVisibility] = useAtom(
    filtersVisibilityAtom
  )

  const selectedCategory = slug && slug[0] ? +slug[0] : 0

  const { data, isLoading, error } = useGetFilterableAttributesQuery(
    graphqlRequestClient,
    {
      filterableAttributesInput: {
        categoryId: selectedCategory
      }
    }
  )

  return (
    <Dialog.Root open={filtersVisibility} onOpenChange={setFiltersVisibility}>
      <Dialog.Content className="fixed inset-0 z-40 h-[calc(100%-calc(64px+var(--safe-aera-inset-bottom)))] overflow-y-auto overscroll-contain bg-white">
        <div>
          <div className="sticky top-0 border-b border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setFiltersVisibility(false)}
                variant="ghost"
                size="small"
                iconOnly
              >
                <IconArrowRight className="h-5 w-5" />
              </Button>
              <div className="font-bold text-gray-800">فیلترها</div>
            </div>
          </div>
          <div className="flex flex-col divide-y divide-gray-200 p-4">
            {data?.filterableAttributes.filters.map(
              (filter) =>
                filter && (
                  <FilterBlock key={filter.id} title={filter.name}>
                    {filter.values?.options.map(
                      (value: string, idx: number) =>
                        value && (
                          <Label
                            key={idx}
                            className="flex w-full items-center gap-1.5 pt-3"
                          >
                            <Checkbox />
                            {value}
                          </Label>
                        )
                    )}
                  </FilterBlock>
                )
            )}
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default MobileFilters
