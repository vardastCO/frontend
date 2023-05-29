"use client"

import {
  useRemoveAreaMutation,
  useRemoveCityMutation,
  useRemoveCountryMutation,
  useRemoveProvinceMutation
} from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/Button"
import { Dialog } from "@core/components/Dialog"
import { Modal, ModalBody, ModalHeader } from "@core/components/Modal"
import { toastQueue } from "@core/components/Toast"
import { IconAlertOctagon } from "@tabler/icons-react"
import { useQueryClient } from "@tanstack/react-query"
import { useAtom, useSetAtom } from "jotai"
import useTranslation from "next-translate/useTranslation"
import { useContext } from "react"
import { LocationsContext } from "./LocationsProvider"

type Props = {
  isOpen: boolean
  onChange: (T: boolean) => void
}

const DeleteModal = ({ isOpen, onChange }: Props) => {
  const { t } = useTranslation()
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
    toastQueue.add(
      t("common:entity_removed_successfully", {
        entity: `${t(`common:${entityType}`)}`
      }),
      {
        timeout: 2000,
        intent: "success"
      }
    )
  }

  const queryClient = useQueryClient()
  const removeCountryMutation = useRemoveCountryMutation(graphqlRequestClient, {
    onSuccess: () => {
      mutationSuccessCommon()
      queryClient.invalidateQueries({ queryKey: ["GetAllCountries"] })
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
    <Modal
      isDismissable={!isLoading}
      size="large"
      isOpen={isOpen}
      onOpenChange={onChange}
    >
      <Dialog>
        <div className="flex">
          <div className="flex-1 pr-6 pt-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <IconAlertOctagon className="h-6 w-6" />
            </span>
          </div>
          <div>
            <ModalHeader title={t("common:warning")} />
            <ModalBody>
              <p className="leading-loose">
                {t(
                  "common:are_you_sure_you_want_to_delete_x_entity_this_action_cannot_be_undone_and_all_associated_data_will_be_permanently_removed",
                  {
                    entity: `${t(`common:${entityType}`)}`,
                    name: entityToRemove.entity?.name
                  }
                )}
              </p>
              <div className="mt-8 flex items-center justify-end gap-2">
                <Button
                  intent="ghost"
                  onPress={() => setRemoveState(false)}
                  isDisabled={isLoading}
                >
                  {t("common:cancel")}
                </Button>
                <Button
                  intent="danger"
                  onPress={() => removeLocation()}
                  isDisabled={isLoading}
                  loading={isLoading}
                >
                  {t("common:delete")}
                </Button>
              </div>
            </ModalBody>
          </div>
        </div>
      </Dialog>
    </Modal>
  )
}

export default DeleteModal
