"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { ClientError } from "graphql-request/build/esm/types"
import { LucideAlertOctagon } from "lucide-react"
import useTranslation from "next-translate/useTranslation"

import { City, useRemoveCityMutation } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Alert, AlertDescription, AlertTitle } from "@core/components/ui/alert"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@core/components/ui/alert-dialog"
import { Button } from "@core/components/ui/button"
import { toast } from "@core/hooks/use-toast"

type Props = {
  cityToDelete?: City
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
}

const DeleteCityModal = ({ cityToDelete, open, onOpenChange }: Props) => {
  const { t } = useTranslation()
  const [errors, setErrors] = useState<ClientError>()
  const queryClient = useQueryClient()

  const removeCityMutation = useRemoveCityMutation(graphqlRequestClient, {
    onSuccess: () => {
      toast({
        description: t("common:entity_removed_successfully", {
          entity: `${t(`common:city`)}`
        }),
        duration: 2000,
        variant: "success"
      })
      onOpenChange(false)
      queryClient.invalidateQueries({ queryKey: ["GetProvince"] })
    },
    onError: (errors: ClientError) => {
      setErrors(errors)
    }
  })

  if (!cityToDelete) return <></>

  const onDelete = () => {
    removeCityMutation.mutate({
      id: cityToDelete.id
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <div className="flex">
          <div className="me-6 flex-1 shrink-0">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-800/20">
              <LucideAlertOctagon className="h-6 w-6" />
            </span>
          </div>
          <div>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("common:warning")}</AlertDialogTitle>
            </AlertDialogHeader>
            {errors && (
              <Alert variant="danger">
                <LucideAlertOctagon />
                <AlertTitle>خطا</AlertTitle>
                <AlertDescription>
                  {(
                    errors.response.errors?.at(0)?.extensions
                      .displayErrors as string[]
                  ).map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </AlertDescription>
              </Alert>
            )}
            <p className="py-4 leading-loose">
              {t(
                "common:are_you_sure_you_want_to_delete_x_entity_this_action_cannot_be_undone_and_all_associated_data_will_be_permanently_removed",
                {
                  entity: `${t(`common:city`)}`,
                  name: cityToDelete?.name
                }
              )}
            </p>
            <AlertDialogFooter>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                  disabled={removeCityMutation.isLoading}
                >
                  {t("common:cancel")}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => onDelete()}
                  disabled={removeCityMutation.isLoading}
                  loading={removeCityMutation.isLoading}
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

export default DeleteCityModal
