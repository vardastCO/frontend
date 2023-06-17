"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"
import { useCreateVocabularyMutation } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { slugify } from "@core/utils/slugify"
import zodI18nMap from "@core/utils/zodErrorMap"
import {
  englishInputSchema,
  persianInputSchema,
  slugInputSchema
} from "@core/utils/zodValidationSchemas"
import { Modal, ModalBody, ModalHeader } from "@core/components/Modal"
import { TextField } from "@core/components/TextField"
import { Button } from "@core/components/ui/button"
import { useToast } from "@core/hooks/use-toast"

type Props = {}

const CreateVocavulary = (props: Props) => {
  const { t } = useTranslation()
  const { toast } = useToast()

  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()
  const createVocabularyMutation = useCreateVocabularyMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        reset()
        queryClient.invalidateQueries({ queryKey: ["GetAllVocabularies"] })
        setOpen(false)
        toast({
          description: t("common:entity_added_successfully", {
            entity: t("common:vocabulary")
          }),
          duration: 2000,
          variant: "success"
        })
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
      <Button size="medium" onClick={() => setOpen(true)}>
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
            <ModalBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
                noValidate
              >
                <TextField
                  label={t("common:title")}
                  type="text"
                  errorMessage={errors.title && errors.title.message}
                  disabled={isSubmitting}
                >
                  <Input {...register("title")} />
                </TextField>
                <TextField
                  label={t("common:english_title")}
                  type="text"
                  errorMessage={errors.titleEn && errors.titleEn.message}
                  disabled={isSubmitting}
                >
                  <Input {...register("titleEn")} dir="ltr" direction="ltr" />
                </TextField>
                <TextField
                  label={t("common:slug")}
                  type="text"
                  errorMessage={errors.slug && errors.slug.message}
                  disabled={isSubmitting}
                  isReadOnly
                >
                  <Input
                    {...register("slug")}
                    plaintext
                    dir="ltr"
                    direction="ltr"
                  />
                </TextField>
                <TextField
                  label={t("common:display_sort")}
                  type="number"
                  errorMessage={errors.sort && errors.sort.message}
                  disabled={isSubmitting}
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
                    variant="ghost"
                    onClick={() => setOpen(false)}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {t("common:cancel")}
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
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

export default CreateVocavulary
