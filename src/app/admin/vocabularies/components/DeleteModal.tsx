"use client"

import { useRemoveCategoryMutation, useRemoveVocabularyMutation } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/Button"
import { Dialog } from "@core/components/Dialog"
import { Modal, ModalBody, ModalHeader } from "@core/components/Modal"
import { toastQueue } from "@core/components/Toast"
import { IconAlertOctagon } from "@tabler/icons-react"
import { useQueryClient } from "@tanstack/react-query"
import { ClientError } from "graphql-request"
import { useAtom, useSetAtom } from "jotai"
import useTranslation from "next-translate/useTranslation"
import { useContext } from "react"
import { VocabulariesContext } from "./VocabulariesProvider"

type Props = {
  isOpen: boolean
  onChange: (T: boolean) => void
}

const DeleteModal = ({ isOpen, onChange }: Props) => {
  const { t } = useTranslation()
  const { removeStateAtom, entityToRemoveAtom } = useContext(VocabulariesContext)
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
  const removeVocabularyMutation = useRemoveVocabularyMutation(graphqlRequestClient, {
    onSuccess: () => {
      mutationSuccessCommon()
      queryClient.invalidateQueries({ queryKey: ["GetAllVocabularies"] })
    },
    onError: (error: ClientError) => {
      setRemoveState(false)
      setEntityToRemove({
        type: "undefined",
        entity: undefined
      })
      if (error.response && error.response.errors) {
        const { errors } = error.response
        toastQueue.add(errors[0].extensions.displayMessage, {
          timeout: 4000,
          intent: "danger"
        })
      }
    }
  })
  const removeCategoryMutation = useRemoveCategoryMutation(graphqlRequestClient, {
    onSuccess: () => {
      mutationSuccessCommon()
      queryClient.invalidateQueries({ queryKey: ["GetVocabulary"] })
    }
  })

  const removeLocation = () => {
    switch (entityType) {
      case "vocabulary":
        removeVocabularyMutation.mutate(mutationVariables)
        break
      case "category":
        removeCategoryMutation.mutate(mutationVariables)
        break
    }
  }

  let isLoading = removeVocabularyMutation.isLoading || removeCategoryMutation.isLoading

  return (
    <Modal isDismissable={!isLoading} size="large" isOpen={isOpen} onOpenChange={onChange}>
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
                    name: entityToRemove.entity?.title
                  }
                )}
              </p>
              <div className="mt-8 flex items-center justify-end gap-2">
                <Button intent="ghost" onPress={() => setRemoveState(false)} isDisabled={isLoading}>
                  {t("common:cancel")}
                </Button>
                <Button intent="danger" onPress={() => removeLocation()} isDisabled={isLoading} loading={isLoading}>
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
