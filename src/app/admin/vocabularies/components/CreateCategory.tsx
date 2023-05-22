"use client"

import { TypeOf, z } from "zod"

import {
  Category,
  useCreateCategoryMutation,
  useGetVocabularyQuery
} from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/Button"
import { Item } from "@core/components/Collection"
import { ComboBox } from "@core/components/ComboBox"
import { Dialog } from "@core/components/Dialog"
import { Input } from "@core/components/Input"
import { ListBox } from "@core/components/ListBox"
import { Modal, ModalContent, ModalHeader } from "@core/components/Modal"
import { Popover } from "@core/components/Popover"
import { TextField } from "@core/components/TextField"
import { toastQueue } from "@core/components/Toast"
import { slugify } from "@core/utils/slugify"
import zodI18nMap from "@core/utils/zodErrorMap"
import {
  englishInputSchema,
  persianInputSchema,
  slugInputSchema
} from "@core/utils/zodValidationSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconSelector } from "@tabler/icons-react"
import { useQueryClient } from "@tanstack/react-query"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

type Props = {
  vocabularySlug: string
}

const CreateCategory = ({ vocabularySlug }: Props) => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()

  const { error, data, isLoading } = useGetVocabularyQuery(
    graphqlRequestClient,
    {
      slug: vocabularySlug
    }
  )

  const createCategoryMutation = useCreateCategoryMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GetVocabulary"] })
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
  const CreateCategorySchema = z.object({
    vocabularyId: z.number().int(),
    parentCategoryId: z.number().int().optional(),
    title: persianInputSchema,
    titleEn: englishInputSchema,
    slug: slugInputSchema,
    sort: z.number().optional().default(0),
    isActive: z.boolean().default(true)
  })
  type CreateCategory = TypeOf<typeof CreateCategorySchema>

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CreateCategory>({
    resolver: zodResolver(CreateCategorySchema),
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

  function onSubmit(data: CreateCategory) {
    const { vocabularyId, parentCategoryId, title, titleEn, slug, sort } = data

    createCategoryMutation.mutate({
      createCategoryInput: {
        vocabularyId,
        parentCategoryId,
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
        {t("common:add_entity", { entity: t("common:category") })}
      </Button>
      <Modal isDismissable isOpen={open} onOpenChange={setOpen}>
        <Dialog>
          <>
            <ModalHeader
              title={t("common:create_new_entity", {
                entity: t("common:category")
              })}
            />
            <ModalContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
                noValidate
              >
                <input type="hidden" name="vocabularyId" value="" />
                <ComboBox
                  label={t("common:parent")}
                  errorMessage={
                    errors.parentCategoryId && errors.parentCategoryId.message
                  }
                  isDisabled={isSubmitting}
                >
                  <Input
                    {...register("parentCategoryId")}
                    suffixElement={<IconSelector className="icon" />}
                  />
                  <Popover>
                    <ListBox items={data?.vocabulary.categories as Category[]}>
                      {(item) => (
                        <Item textValue={item.title}>{item.title}</Item>
                      )}
                    </ListBox>
                  </Popover>
                </ComboBox>
                <TextField
                  label={t("common:title")}
                  errorMessage={errors.title && errors.title.message}
                  isDisabled={isSubmitting}
                >
                  <Input {...register("title")} />
                </TextField>
                <TextField
                  label={t("common:english_title")}
                  errorMessage={errors.titleEn && errors.titleEn.message}
                  isDisabled={isSubmitting}
                >
                  <Input {...register("titleEn")} dir="ltr" />
                </TextField>
                <TextField
                  label={t("common:slug")}
                  errorMessage={errors.slug && errors.slug.message}
                  isDisabled={isSubmitting}
                  isReadOnly
                >
                  <Input {...register("slug")} plaintext dir="ltr" />
                </TextField>
                <TextField
                  label={t("common:display_sort")}
                  errorMessage={errors.sort && errors.sort.message}
                  isDisabled={isSubmitting}
                >
                  <Input {...register("sort")} />
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

export default CreateCategory
