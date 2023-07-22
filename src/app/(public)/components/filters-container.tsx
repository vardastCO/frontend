import * as Checkbox from "@radix-ui/react-checkbox"
import * as Label from "@radix-ui/react-label"
import { IconCheck } from "@tabler/icons-react"

import {
  FilterAttribute,
  useGetAllFilterableAttributesQuery
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import FilterBlock from "@/app/(public)/components/filter-block"

interface FiltersContainerProps {
  selectedCategoryId: number
  onFilterAttributesChanged: ({
    status,
    id,
    value
  }: FilterAttribute & { status: Checkbox.CheckedState }) => void
}

const FiltersContainer = ({
  selectedCategoryId,
  onFilterAttributesChanged
}: FiltersContainerProps) => {
  const { data, isLoading, error } = useGetAllFilterableAttributesQuery(
    graphqlRequestClient,
    {
      filterableAttributesInput: {
        categoryId: selectedCategoryId
      }
    }
  )

  if (isLoading)
    return (
      <div className="flex animate-pulse flex-col gap-3 py-6">
        <div className="h-5 w-[80%] rounded-md bg-gray-200"></div>
        <div className="h-5 w-full rounded-md bg-gray-200"></div>
        <div className="h-5 w-[90%] rounded-md bg-gray-200"></div>
      </div>
    )
  if (!data) return <></>

  return (
    <>
      {data.filterableAttributes.filters.map(
        (filter) =>
          filter && (
            <FilterBlock key={filter.id} title={filter.name}>
              {filter.values?.options.map(
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
                            id: filter.id,
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
                    // <Label
                    //   key={idx}
                    //   className="flex w-full items-center gap-1.5 pt-3"
                    // >
                    //   <Checkbox />
                    //   {value}
                    // </Label>
                  )
              )}
            </FilterBlock>
          )
      )}
    </>
  )
}

export default FiltersContainer
