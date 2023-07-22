"use client"

import { useContext, useState } from "react"
import { useParams } from "next/navigation"
import * as Checkbox from "@radix-ui/react-checkbox"
import * as Dialog from "@radix-ui/react-dialog"
import * as Label from "@radix-ui/react-label"
import { IconArrowRight, IconCheck, IconChevronLeft } from "@tabler/icons-react"
import { useAtom } from "jotai"

import {
  Attribute,
  FilterAttribute,
  useGetAllFilterableAttributesQuery
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/ui/button"
import { PublicContext } from "@/app/(public)/components/public-provider"

type MobileFilterableAttributeItemProps = {
  title: string
  onFilterableAttributeChanged: () => void
}

const MobileFilterableAttributeItem = ({
  title,
  onFilterableAttributeChanged
}: MobileFilterableAttributeItemProps) => {
  return (
    <Button
      noStyle
      className="flex w-full items-center justify-between py-3"
      onClick={() => onFilterableAttributeChanged()}
    >
      <span className="font-bold text-gray-800">{title}</span>
      <IconChevronLeft className="h-4 w-4 text-gray-400" />
    </Button>
  )
}

type MobileFilterableAttributePageProps = {
  attribute: Attribute
  onFilterAttributesChanged: ({
    status,
    id,
    value
  }: FilterAttribute & { status: Checkbox.CheckedState }) => void
}

const MobileFilterableAttributePage = ({
  attribute,
  onFilterAttributesChanged
}: MobileFilterableAttributePageProps) => {
  return (
    <div className="flex flex-col gap-3">
      {attribute.values?.options.map(
        (value: string, idx: number) =>
          value && (
            <Label.Root key={idx} className="flex items-center gap-2">
              <Checkbox.Root
                className="flex
                    h-5
                    w-5
                    appearance-none
                    items-center
                    justify-center
                    rounded-md
                    border-2
                    border-gray-600
                    bg-white
                    outline-none
                    data-[state='checked']:border-brand-500
                    data-[state='checked']:bg-brand-500"
                onCheckedChange={(checked) =>
                  onFilterAttributesChanged({
                    status: checked,
                    id: attribute.id,
                    value: value
                  })
                }
              >
                <Checkbox.Indicator className="text-white">
                  <IconCheck className="h-3 w-3" stroke={3} />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <span className="inline-block leading-none">{value}</span>
            </Label.Root>
          )
      )}
    </div>
  )
}

type MobileFilterableAttributesProps = {
  onFilterAttributesChanged: ({
    status,
    id,
    value
  }: FilterAttribute & { status: Checkbox.CheckedState }) => void
}

const MobileFilterableAttributes = ({
  onFilterAttributesChanged
}: MobileFilterableAttributesProps) => {
  const { slug } = useParams()
  const [selectedFilterAttribute, setSelectedFilterAttribute] =
    useState<Attribute | null>(null)
  const { filtersVisibilityAtom } = useContext(PublicContext)
  const [filtersVisibility, setFiltersVisibility] = useAtom(
    filtersVisibilityAtom
  )

  const selectedCategory = slug && slug[0] ? +slug[0] : 0

  const { data, isLoading, error } = useGetAllFilterableAttributesQuery(
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
                onClick={() => {
                  if (!selectedFilterAttribute) setFiltersVisibility(false)
                  if (selectedFilterAttribute) setSelectedFilterAttribute(null)
                }}
                variant="ghost"
                size="small"
                iconOnly
              >
                <IconArrowRight className="h-5 w-5" />
              </Button>
              <div className="font-bold text-gray-800">
                {selectedFilterAttribute
                  ? selectedFilterAttribute.name
                  : "فیلترها"}
              </div>
            </div>
          </div>
          <div className="p-4">
            {selectedFilterAttribute ? (
              <MobileFilterableAttributePage
                attribute={selectedFilterAttribute}
                onFilterAttributesChanged={onFilterAttributesChanged}
              />
            ) : (
              <>
                <div className="flex flex-col divide-y divide-gray-200">
                  {data?.filterableAttributes.filters.map(
                    (filter) =>
                      filter && (
                        <MobileFilterableAttributeItem
                          key={filter.id}
                          title={filter.name}
                          onFilterableAttributeChanged={() =>
                            setSelectedFilterAttribute(filter as Attribute)
                          }
                        />
                      )
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default MobileFilterableAttributes
