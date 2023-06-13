"use client"

import { TypeOf, z } from "zod"

import { Category, useCreateCategoryMutation, useGetVocabularyQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/Button"
import { Item } from "@core/components/Collection"
import { ComboBox } from "@core/components/ComboBox"
import { Dialog } from "@core/components/Dialog"
import { Input } from "@core/components/Input"
import { ListBox } from "@core/components/ListBox"
import { Modal, ModalBody, ModalHeader } from "@core/components/Modal"
import { Popover } from "@core/components/Popover"
import { TextField } from "@core/components/TextField"
import { toastQueue } from "@core/components/Toast"
import { slugify } from "@core/utils/slugify"
import zodI18nMap from "@core/utils/zodErrorMap"
import { englishInputSchema, persianInputSchema, slugInputSchema } from "@core/utils/zodValidationSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { ClientError } from "graphql-request"
import useTranslation from "next-translate/useTranslation"
import { Key, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

type Props = {
  vocabularyId: number
}

const CreateCategory = ({ vocabularyId }: Props) => {
  const { t } = useTranslation()

  const [displayErrors, setDisplayErrors] = useState<string[] | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [parentCategoryId, setParentCategoryId] = useState<Key | null>(null)

  const queryClient = useQueryClient()

  //   TODO: handle loading and error states
  const { error, data, isLoading } = useGetVocabularyQuery(graphqlRequestClient, {
    id: vocabularyId
  })

  const createCategoryMutation = useCreateCategoryMutation(graphqlRequestClient, {
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({ queryKey: ["GetVocabulary"] })
      setOpen(false)
      toastQueue.add(
        t("common:entity_added_successfully", {
          entity: t("common:category")
        }),
        {
          timeout: 2000,
          intent: "success"
        }
      )
    },
    onError: (error: ClientError) => {
      if (error.response) {
        const tempErrors: string[] = []
        const { errors } = error.response
        errors?.forEach((err) => {
          tempErrors.push(err.extensions.displayMessage as string)
        })
        setDisplayErrors(tempErrors)
      }
    }
  })

  z.setErrorMap(zodI18nMap)
  const CreateCategorySchema = z.object({
    title: persianInputSchema,
    titleEn: englishInputSchema,
    slug: slugInputSchema,
    sort: z.number().optional().default(0),
    isActive: z.boolean().optional().default(true)
  })
  type CreateCategory = TypeOf<typeof CreateCategorySchema>

  const {
    reset,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CreateCategory>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      sort: 0,
      isActive: true
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
    const { title, titleEn, slug, sort } = data

    createCategoryMutation.mutate({
      createCategoryInput: {
        vocabularyId,
        parentCategoryId: parentCategoryId as number,
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
            <ModalBody>
              <>
                {createCategoryMutation.isError && displayErrors?.map((err, idx) => <p key={idx}>{err}</p>)}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
                  <ComboBox
                    label={t("common:parent")}
                    onSelectionChange={setParentCategoryId}
                    isDisabled={isSubmitting}
                  >
                    <Popover>
                      <ListBox items={data?.vocabulary.categories as Category[]}>
                        {(item) => (
                          <Item id={item.id} textValue={item.title}>
                            {item.title}
                          </Item>
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
                    <Input {...register("titleEn")} dir="ltr" direction="ltr" />
                  </TextField>
                  <TextField
                    label={t("common:slug")}
                    errorMessage={errors.slug && errors.slug.message}
                    isDisabled={isSubmitting}
                    isReadOnly
                  >
                    <Input {...register("slug")} plaintext dir="ltr" direction="ltr" />
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
              </>
            </ModalBody>
          </>
        </Dialog>
      </Modal>
    </>
  )
}

export default CreateCategory
