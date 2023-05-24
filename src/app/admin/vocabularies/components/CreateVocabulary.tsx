"use client"

import {
  englishInputSchema,
  persianInputSchema,
  slugInputSchema
} from "@core/utils/zodValidationSchemas"

import { TypeOf, z } from "zod"

import { useCreateVocabularyMutation } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/Button"
import { Dialog } from "@core/components/Dialog"
import { Input } from "@core/components/Input"
import { Modal, ModalContent, ModalHeader } from "@core/components/Modal"
import { TextField } from "@core/components/TextField"
import { toastQueue } from "@core/components/Toast"
import { slugify } from "@core/utils/slugify"
import zodI18nMap from "@core/utils/zodErrorMap"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

type Props = {}

const CreateVocavulary = (props: Props) => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()
  const createVocabularyMutation = useCreateVocabularyMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        reset()
        queryClient.invalidateQueries({ queryKey: ["GetAllVocabularies"] })
        setOpen(false)
        toastQueue.add(
          t("common:entity_added_successfully", {
            entity: t("common:vocabulary")
          }),
          {
            timeout: 2000,
            intent: "success"
          }
        )
      }
    }
  )

  z.setErrorMap(zodI18nMap)
  const CreateVocabularySchema = z.object({
    title: persianInputSchema,
    titleEn: englishInputSchema,
    slug: slugInputSchema,
    sort: z.number().optional().default(0)
  })
  type CreateVocavulary = TypeOf<typeof CreateVocabularySchema>

  const {
    reset,
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CreateVocavulary>({
    resolver: zodResolver(CreateVocabularySchema),
    defaultValues: {
      sort: 0
    }
  })

  const titleEn = watch("titleEn")

  useEffect(() => {
    if (titleEn) {
      setValue("slug", slugify(titleEn))
    } else {
      setValue("slug", "")
    }
  }, [titleEn, setValue])

  function onSubmit(data: CreateVocavulary) {
    const { title, titleEn, slug, sort } = data

    createVocabularyMutation.mutate({
      createVocabularyInput: {
        title,
        titleEn,
        slug,
        sort
      }
    })
  }

  return (
    <>
      <Button size="medium" onPress={() => setOpen(true)}>
        {t("common:add_entity", { entity: t("common:vocabulary") })}
      </Button>
      <Modal isDismissable isOpen={open} onOpenChange={setOpen}>
        <Dialog>
          <>
            <ModalHeader
              title={t("common:create_new_entity", {
                entity: t("common:vocabulary")
              })}
            />
            <ModalContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
                noValidate
              >
                <TextField
                  label={t("common:title")}
                  type="text"
                  errorMessage={errors.title && errors.title.message}
                  isDisabled={isSubmitting}
                >
                  <Input {...register("title")} />
                </TextField>
                <TextField
                  label={t("common:english_title")}
                  type="text"
                  errorMessage={errors.titleEn && errors.titleEn.message}
                  isDisabled={isSubmitting}
                >
                  <Input {...register("titleEn")} dir="ltr" />
                </TextField>
                <TextField
                  label={t("common:slug")}
                  type="text"
                  errorMessage={errors.slug && errors.slug.message}
                  isDisabled={isSubmitting}
                  isReadOnly
                >
                  <Input {...register("slug")} plaintext dir="ltr" />
                </TextField>
                <TextField
                  label={t("common:display_sort")}
                  type="number"
                  errorMessage={errors.sort && errors.sort.message}
                  isDisabled={isSubmitting}
                >
                  <Input
                    min={0}
                    {...register("sort", {
                      valueAsNumber: true,
                      min: 0
                    })}
                  />
                </TextField>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    intent="ghost"
                    onPress={() => setOpen(false)}
                    loading={isSubmitting}
                    isDisabled={isSubmitting}
                  >
                    {t("common:cancel")}
                  </Button>
                  <Button type="submit" isDisabled={isSubmitting}>
                    {t("common:submit")}
                  </Button>
                </div>
              </form>
            </ModalContent>
          </>
        </Dialog>
      </Modal>
    </>
  )
}

export default CreateVocavulary
