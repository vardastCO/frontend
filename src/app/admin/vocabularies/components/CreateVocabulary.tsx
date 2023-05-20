"use client"

import {
  englishInputSchema,
  persianInputSchema,
  slugInputSchema
} from "@core/utils/zodValidationSchemas"

import { DialogTrigger } from "react-aria-components"
import { TypeOf, z } from "zod"

import { useCreateVocabularyMutation } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import TextField from "@core/components/form/TextField"
import { slugify } from "@core/utils/slugify"
import zodI18nMap from "@core/utils/zodErrorMap"
import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "../../../../@core/components/ui/Button"
import { Dialog } from "../../../../@core/components/ui/Dialog"
import {
  Modal,
  ModalContent,
  ModalHeader
} from "../../../../@core/components/ui/Modal"

type Props = {}

const CreateVocavulary = (props: Props) => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  const createVocabularyMutation = useCreateVocabularyMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        setOpen(false)
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
  }, [titleEn])

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
    <DialogTrigger>
      <Button size="medium">
        {t("common:add_entity", { entity: t("common:vocabulary") })}
      </Button>
      <Modal>
        <Dialog>
          {({ close }) => (
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
                    name="title"
                    control={control}
                    errorMessage={errors.title && errors.title.message}
                    isDisabled={isSubmitting}
                  />
                  <TextField
                    label={t("common:english_title")}
                    type="text"
                    name="titleEn"
                    control={control}
                    errorMessage={errors.titleEn && errors.titleEn.message}
                    isDisabled={isSubmitting}
                    dir="ltr"
                  />
                  <TextField
                    label={t("common:slug")}
                    type="text"
                    name="slug"
                    control={control}
                    errorMessage={errors.slug && errors.slug.message}
                    isDisabled={isSubmitting}
                    isReadOnly
                    plaintext
                    dir="ltr"
                  />
                  <TextField
                    label={t("common:display_sort")}
                    type="number"
                    name="sort"
                    control={control}
                    errorMessage={errors.sort && errors.sort.message}
                    isDisabled={isSubmitting}
                  />
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      intent="ghost"
                      onPress={close}
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
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  )
}

export default CreateVocavulary
