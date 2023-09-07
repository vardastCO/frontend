"use client"

import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { ClientError } from "graphql-request"
import { LucideAlertOctagon } from "lucide-react"
import useTranslation from "next-translate/useTranslation"

import {
  AttributeValue,
  Maybe,
  useRemoveAttributeValueMutation
} from "@/generated"

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

type AttributeSectionProps = {
  attributes: Maybe<AttributeValue>[] | undefined
  onOpenCreateModal: () => void
  onOpenEditModal: (attribute: AttributeValue) => void
}

const AttributeSection = ({
  onOpenCreateModal,
  onOpenEditModal,
  attributes
}: AttributeSectionProps) => {
  const { t } = useTranslation()
  const [attributeToDelete, setAttributeToDelete] =
    useState<AttributeValue | null>()
  const [errors, setErrors] = useState<ClientError>()
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const removeAttributeValueMutation = useRemoveAttributeValueMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        toast({
          description: t("common:entity_removed_successfully", {
            entity: `${t(`common:attribute`)}`
          }),
          duration: 2000,
          variant: "success"
        })
        setDeleteModalOpen(false)
        queryClient.invalidateQueries({ queryKey: ["GetProduct"] })
      },
      onError: (errors: ClientError) => {
        setErrors(errors)
      }
    }
  )

  const onDelete = () => {
    if (attributeToDelete) {
      removeAttributeValueMutation.mutate({
        id: attributeToDelete.id
      })
    }
  }

  return (
    <>
      <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
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
                    entity: `${t(`common:attribute`)}`,
                    name: attributeToDelete?.attribute.name
                  }
                )}
              </p>
              <AlertDialogFooter>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setAttributeToDelete(null)
                      setDeleteModalOpen(false)
                    }}
                    disabled={removeAttributeValueMutation.isLoading}
                  >
                    {t("common:cancel")}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onDelete()}
                    disabled={removeAttributeValueMutation.isLoading}
                    loading={removeAttributeValueMutation.isLoading}
                  >
                    {t("common:delete")}
                  </Button>
                </div>
              </AlertDialogFooter>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      <div>
        <h2 className="section-title">
          {t("common:create_product_attributes_section_title")}
        </h2>
        <p className="section-description">
          {t("common:create_product_attributes_section_description")}
        </p>
        <div className="section-body">
          {attributes && attributes.length > 0 && (
            <div className="card table-responsive rounded">
              <table className="table">
                <thead>
                  <tr>
                    <th>{t("common:attribute")}</th>
                    <th>{t("common:value")}</th>
                    <th>{t("common:product_sku")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {attributes.map(
                    (attribute) =>
                      attribute && (
                        <tr key={attribute.id}>
                          <td>
                            <span className="font-medium">
                              {attribute.attribute.name}
                            </span>
                          </td>
                          <td>
                            {attribute.value} {attribute.attribute.uom?.name}
                          </td>
                          <td>{attribute.sku}</td>
                          <td align="left">
                            <div className="flex items-center gap-4">
                              <Button
                                size="small"
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                  onOpenEditModal(attribute)
                                }}
                              >
                                {t("common:edit")}
                              </Button>
                              <Button
                                size="small"
                                variant="link"
                                className="!text-red-500"
                                type="button"
                                onClick={() => {
                                  setAttributeToDelete(attribute)
                                  setDeleteModalOpen(true)
                                }}
                              >
                                {t("common:delete")}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <Button
              variant="secondary"
              type="button"
              onClick={() => onOpenCreateModal()}
            >
              {t("common:add_entity", { entity: t("common:attribute") })}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AttributeSection
