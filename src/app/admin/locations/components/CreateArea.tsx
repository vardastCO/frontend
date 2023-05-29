"use client"

import { useCreateAreaMutation } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import {
  englishInputSchema,
  persianInputSchema,
  slugInputSchema
} from "@core/utils/zodValidationSchemas"
import { useQueryClient } from "@tanstack/react-query"

import { useEffect, useState } from "react"
import { TypeOf, z } from "zod"

import { Button } from "@core/components/Button"
import { Checkbox } from "@core/components/Checkbox"
import { Dialog } from "@core/components/Dialog"
import { Input } from "@core/components/Input"
import { Modal, ModalBody, ModalHeader } from "@core/components/Modal"
import { TextField } from "@core/components/TextField"
import { toastQueue } from "@core/components/Toast"
import { slugify } from "@core/utils/slugify"
import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { Controller, useForm } from "react-hook-form"

type Props = {
  cityId: number
}

const CreateArea = ({ cityId }: Props) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()
  const createAreaMutation = useCreateAreaMutation(graphqlRequestClient, {
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({ queryKey: ["GetCity"] })
      setOpen(false)
      toastQueue.add(
        t("common:entity_added_successfully", {
          entity: t("common:area")
        }),
        {
          timeout: 2000,
          intent: "success"
        }
      )
    }
  })

  const CreateAreaSchema = z.object({
    name: persianInputSchema,
    nameEn: englishInputSchema,
    slug: slugInputSchema,
    sort: z.number().optional().default(0),
    isActive: z.boolean().optional().default(true)
  })
  type CreateArea = TypeOf<typeof CreateAreaSchema>

  const {
    reset,
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CreateArea>({
    resolver: zodResolver(CreateAreaSchema),
    defaultValues: {
      sort: 0,
      isActive: true
    }
  })

  const nameEn = watch("nameEn")

  useEffect(() => {
    if (nameEn) {
      setValue("slug", slugify(nameEn))
    } else {
      setValue("slug", "")
    }
  }, [nameEn, setValue])

  function onSubmit(data: CreateArea) {
    const { name, nameEn, slug, sort, isActive } = data
    createAreaMutation.mutate({
      createAreaInput: {
        cityId,
        name,
        nameEn,
        slug,
        sort,
        isActive
      }
    })
  }

  return (
    <>
      <Button size="medium" onPress={() => setOpen(true)}>
        {t("common:add_entity", { entity: t("common:area") })}
      </Button>
      <Modal isDismissable isOpen={open} onOpenChange={setOpen}>
        <Dialog>
          <>
            <ModalHeader
              title={t("common:create_new_entity", {
                entity: t("common:area")
              })}
            />
            <ModalBody>
              {createAreaMutation.isError && <p>خطایی رخ داده</p>}
              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <TextField
                  isDisabled={isSubmitting}
                  label={t("common:name")}
                  errorMessage={errors.name && errors.name.message}
                >
                  <Input {...register("name")} />
                </TextField>
                <TextField
                  isDisabled={isSubmitting}
                  label={t("common:english_name")}
                  errorMessage={errors.nameEn && errors.nameEn.message}
                >
                  <Input {...register("nameEn")} dir="ltr" />
                </TextField>
                <TextField
                  isDisabled={isSubmitting}
                  label={t("common:slug")}
                  errorMessage={errors.slug && errors.slug.message}
                  isReadOnly
                >
                  <Input {...register("slug")} dir="ltr" plaintext />
                </TextField>
                <TextField
                  isDisabled={isSubmitting}
                  label={t("common:display_sort")}
                  type="number"
                  errorMessage={errors.sort && errors.sort.message}
                >
                  <Input
                    min={0}
                    {...register("sort", {
                      valueAsNumber: true,
                      min: 0
                    })}
                  />
                </TextField>
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Checkbox
                      label={t("common:is_active")}
                      ref={field.ref}
                      name={field.name}
                      isSelected={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      errorMessage={error && error.message}
                    />
                  )}
                />
                <div className="flex items-center justify-end gap-2">
                  <Button
                    intent="ghost"
                    onPress={() => setOpen(false)}
                    isDisabled={isSubmitting}
                  >
                    {t("common:cancel")}
                  </Button>
                  <Button
                    type="submit"
                    isDisabled={isSubmitting}
                    loading={isSubmitting}
                  >
                    {t("common:submit")}
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        </Dialog>
      </Modal>
    </>
  )
}

export default CreateArea
