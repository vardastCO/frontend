"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import useTranslation from "next-translate/useTranslation"
import { Controller, useForm } from "react-hook-form"
import { TypeOf, z } from "zod"
import { useCreateProvinceMutation } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { slugify } from "@core/utils/slugify"
import {
  englishInputSchema,
  persianInputSchema,
  slugInputSchema
} from "@core/utils/zodValidationSchemas"
import { Modal, ModalBody, ModalHeader } from "@core/components/Modal"
import { TextField } from "@core/components/TextField"
import { Button } from "@core/components/ui/button"
import { Checkbox } from "@core/components/ui/Checkbox"

type Props = {
  countryId: number
}

const CreateProvince = ({ countryId }: Props) => {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()
  const createProvinceMutation = useCreateProvinceMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        reset()
        queryClient.invalidateQueries({ queryKey: ["GetCountry"] })
        setOpen(false)
        toast(
          t("common:entity_added_successfully", {
            entity: t("common:province")
          }),
          {
            duration: 2000,
            variant: "success"
          }
        )
      }
    }
  )

  const CreateProvinceSchema = z.object({
    name: persianInputSchema,
    nameEn: englishInputSchema,
    slug: slugInputSchema,
    sort: z.number().optional().default(0),
    isActive: z.boolean().optional().default(true)
  })
  type CreateProvince = TypeOf<typeof CreateProvinceSchema>

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateProvince>({
    resolver: zodResolver(CreateProvinceSchema),
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

  function onSubmit(data: CreateProvince) {
    const { name, nameEn, slug, sort, isActive } = data
    createProvinceMutation.mutate({
      createProvinceInput: {
        countryId,
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
      <Button size="medium" onClick={() => setOpen(true)}>
        {t("common:add_entity", { entity: t("common:province") })}
      </Button>
      <Modal isDismissable isOpen={open} onOpenChange={setOpen}>
        <Dialog>
          <>
            <ModalHeader
              title={t("common:create_new_entity", {
                entity: t("common:province")
              })}
            />
            <ModalBody>
              {createProvinceMutation.isError && <p>خطایی رخ داده</p>}
              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <TextField
                  disabled={isSubmitting}
                  label={t("common:name")}
                  errorMessage={errors.name && errors.name.message}
                >
                  <Input {...register("name")} />
                </TextField>
                <TextField
                  disabled={isSubmitting}
                  label={t("common:english_name")}
                  errorMessage={errors.nameEn && errors.nameEn.message}
                >
                  <Input {...register("nameEn")} dir="ltr" direction="ltr" />
                </TextField>
                <TextField
                  disabled={isSubmitting}
                  label={t("common:slug")}
                  errorMessage={errors.slug && errors.slug.message}
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
                  disabled={isSubmitting}
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
                    variant="ghost"
                    onClick={() => setOpen(false)}
                    disabled={isSubmitting}
                  >
                    {t("common:cancel")}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
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

export default CreateProvince
