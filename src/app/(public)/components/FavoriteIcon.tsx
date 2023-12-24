import { BookmarkIcon as OutlineBookmarkIcon } from "@heroicons/react/24/outline"
import { BookmarkIcon } from "@heroicons/react/24/solid"
import { UseQueryResult } from "@tanstack/react-query"

import {
  EntityTypeEnum,
  GetIsFavoriteQuery,
  useUpdateFavoriteMutation
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/ui/button"

type Props = {
  isFavoriteQuery: UseQueryResult<GetIsFavoriteQuery, unknown>
  type: EntityTypeEnum
  entityId: number
}

export default function FavoriteIcon({
  isFavoriteQuery,
  type,
  entityId
}: Props) {
  const createEventTrackerMutation = useUpdateFavoriteMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        isFavoriteQuery.refetch()
      }
    }
  )

  const toggleFavorite = () => {
    createEventTrackerMutation.mutate({
      UpdateFavoriteInput: {
        type,
        entityId
      }
    })
  }

  return (
    <Button
      id="header-back-button"
      variant={"ghost"}
      onClick={toggleFavorite}
      //   loading={createEventTrackerMutation.isLoading}
      disabled={createEventTrackerMutation.isLoading}
      iconOnly
    >
      {isFavoriteQuery.data?.isFavorite ? (
        <BookmarkIcon className="h-6 w-6 text-primary" />
      ) : (
        <OutlineBookmarkIcon className="h-6 w-6 text-alpha" />
      )}
    </Button>
  )
}
