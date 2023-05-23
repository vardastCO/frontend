"use client"

import { useCreateCityMutation } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import {
  englishInputSchema,
  persianInputSchema,
  slugInputSchema
} from "@core/utils/zodValidationSchemas"
import { useQueryClient } from "@tanstack/react-query"

import { useEffect, useState } from "react"
import { TypeOf, z } from "zod"

import { CityTypesEnum } from "@/generated"
import { Button } from "@core/components/Button"
import CheckboxField from "@core/components/CheckboxField"
import { Dialog } from "@core/components/Dialog"
import { Input } from "@core/components/Input"
import { Modal, ModalContent, ModalHeader } from "@core/components/Modal"
import { TextField } from "@core/components/TextField"
import { slugify } from "@core/utils/slugify"
import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"

type Props = {
  provinceId: number
}

const CreateCity = ({ provinceId }: Props) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()
  const createProvinceMutation = useCreateCityMutation(graphqlRequestClient, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetCountry"] })
      setOpen(false)
    }
  })

  const CreateCitySchema = z.object({
    name: persianInputSchema,
    nameEn: englishInputSchema,
    slug: slugInputSchema,
    sort: z.number().optional().default(0),
    isActive: z.boolean().optional().default(true)
  })
  type CreateCity = TypeOf<typeof CreateCitySchema>

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CreateCity>({
    resolver: zodResolver(CreateCitySchema),
    defaultValues: {
      sort: 0
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

  function onSubmit(data: CreateCity) {
    const { name, nameEn, slug, sort, isActive } = data
    createProvinceMutation.mutate({
      input: {
        provinceId,
        name,
        nameEn,
        slug,
        sort,
        isActive,
        type: CityTypesEnum.City
      }
    })
  }

  return (
    <>
      <Button size="medium" onPress={() => setOpen(true)}>
        {t("common:add_entity", { entity: t("common:city") })}
      </Button>
      <Modal isDismissable isOpen={open} onOpenChange={setOpen}>
        <Dialog>
          <>
            <ModalHeader
              title={t("common:create_new_entity", {
                entity: t("common:city")
              })}
            />
            <ModalContent>
              {createProvinceMutation.isError && <p>خطایی رخ داده</p>}
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
                <CheckboxField
                  isDisabled={isSubmitting}
                  label={t("common:is_active")}
                  name="isActive"
                  //   @ts-ignore
                  control={control}
                  errorMessage={errors.isActive && errors.isActive.message}
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
            </ModalContent>
          </>
        </Dialog>
      </Modal>
    </>
  )
}

export default CreateCity
