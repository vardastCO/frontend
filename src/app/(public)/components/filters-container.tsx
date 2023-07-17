import { useGetFilterableAttributesQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Checkbox } from "@core/components/ui/checkbox"
import { Label } from "@core/components/ui/label"
import FilterBlock from "@/app/(public)/components/filter-block"

interface FiltersContainerProps {
  selectedCategoryId: number
}

const FiltersContainer = ({ selectedCategoryId }: FiltersContainerProps) => {
  const { data, isLoading, error } = useGetFilterableAttributesQuery(
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
    </>
  )
}

export default FiltersContainer
