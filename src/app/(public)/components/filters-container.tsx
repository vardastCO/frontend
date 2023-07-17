import { useGetFilterableAttributesQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Checkbox } from "@core/components/ui/checkbox"
import { Label } from "@core/components/ui/label"

interface FiltersContainerProps {
  selectedCategoryId: number
}

const FiltersContainer = ({ selectedCategoryId }: FiltersContainerProps) => {
  const { data, isLoading, error } = useGetFilterableAttributesQuery(
    graphqlRequestClient,
    {
      filterInput: {
        categoryId: selectedCategoryId
      }
    }
  )

  if (!data) return <></>

  return (
    <div>
      {data.filterableAttributes.filters.map(
        (filter) =>
          filter && (
            <div key={filter.id}>
              <div className="mb-4 font-bold text-gray-800">{filter.name}</div>
              <div>
                {filter.values?.options.map(
                  (value, idx) =>
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
              </div>
            </div>
          )
      )}
    </div>
  )
}

export default FiltersContainer
