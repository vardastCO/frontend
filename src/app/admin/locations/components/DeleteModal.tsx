"use client"

import { useContext } from "react"
import { IconAlertOctagon } from "@tabler/icons-react"
import { useQueryClient } from "@tanstack/react-query"
import { ClientError } from "graphql-request/build/esm/types"
import { useAtom, useSetAtom } from "jotai"
import useTranslation from "next-translate/useTranslation"

import {
  useRemoveAreaMutation,
  useRemoveCityMutation,
  useRemoveCountryMutation,
  useRemoveProvinceMutation
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@core/components/ui/alert-dialog"
import { Button } from "@core/components/ui/button"
import { useToast } from "@core/hooks/use-toast"

import { LocationsContext } from "./LocationsProvider"

type Props = {
  isOpen: boolean
  onChange: (T: boolean) => void
}

const DeleteModal = ({ isOpen, onChange }: Props) => {
  const { t } = useTranslation()
  const { toast } = useToast()
  const { removeStateAtom, entityToRemoveAtom } = useContext(LocationsContext)
  const setRemoveState = useSetAtom(removeStateAtom)
  const [entityToRemove, setEntityToRemove] = useAtom(entityToRemoveAtom)

  const entityType = entityToRemove.type
  const mutationVariables = {
    id: entityToRemove.entity?.id as number
  }
  const mutationSuccessCommon = () => {
    setRemoveState(false)
    setEntityToRemove({
      type: "undefined",
      entity: undefined
    })
    toast({
      description: t("common:entity_removed_successfully", {
        entity: `${t(`common:${entityType}`)}`
      }),
      duration: 2000,
      variant: "success"
    })
  }

  const queryClient = useQueryClient()
  const removeCountryMutation = useRemoveCountryMutation(graphqlRequestClient, {
    onSuccess: () => {
      mutationSuccessCommon()
      queryClient.invalidateQueries({ queryKey: ["GetAllCountries"] })
    },
    onError: (error: ClientError) => {
      setRemoveState(false)
      setEntityToRemove({
        type: "undefined",
        entity: undefined
      })
      if (error.response && error.response.errors) {
        const { errors } = error.response
        toast({
          description: errors[0].extensions.displayMessage as string,
          duration: 4000,
          variant: "danger"
        })
      }
    }
  })
  const removeProvinceMutation = useRemoveProvinceMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        mutationSuccessCommon()
        queryClient.invalidateQueries({ queryKey: ["GetCountry"] })
      }
    }
  )
  const removeCityMutation = useRemoveCityMutation(graphqlRequestClient, {
    onSuccess: () => {
      mutationSuccessCommon()
      queryClient.invalidateQueries({ queryKey: ["GetProvince"] })
    }
  })
  const removeAreaMutation = useRemoveAreaMutation(graphqlRequestClient, {
    onSuccess: () => {
      mutationSuccessCommon()
      queryClient.invalidateQueries({ queryKey: ["GetCity"] })
    }
  })

  const removeLocation = () => {
    switch (entityType) {
      case "country":
        removeCountryMutation.mutate(mutationVariables)
        break
      case "province":
        removeProvinceMutation.mutate(mutationVariables)
        break
      case "city":
        removeCityMutation.mutate(mutationVariables)
        break
      case "area":
        removeAreaMutation.mutate(mutationVariables)
        break
    }
  }

  let isLoading =
    removeCountryMutation.isLoading ||
    removeProvinceMutation.isLoading ||
    removeCityMutation.isLoading ||
    removeAreaMutation.isLoading

  return (
    <AlertDialog open={isOpen} onOpenChange={onChange}>
      <AlertDialogContent>
        <div className="flex">
          <div className="me-6 flex-1 shrink-0">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-800/20">
              <IconAlertOctagon className="h-6 w-6" />
            </span>
          </div>
          <div>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("common:warning")}</AlertDialogTitle>
            </AlertDialogHeader>
            <p className="py-4 leading-loose">
              {t(
                "common:are_you_sure_you_want_to_delete_x_entity_this_action_cannot_be_undone_and_all_associated_data_will_be_permanently_removed",
                {
                  entity: `${t(`common:${entityType}`)}`,
                  name: entityToRemove.entity?.name
                }
              )}
            </p>
            <AlertDialogFooter>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setRemoveState(false)}
                  disabled={isLoading}
                >
                  {t("common:cancel")}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => removeLocation()}
                  disabled={isLoading}
                  loading={isLoading}
                >
                  {t("common:delete")}
                </Button>
              </div>
            </AlertDialogFooter>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteModal
