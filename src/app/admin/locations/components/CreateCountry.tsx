"use client"

import { useCreateCountryMutation } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import {
  englishInputSchema,
  persianInputSchema,
  slugInputSchema
} from "@core/utils/zodValidationSchemas"

import { useEffect, useState } from "react"
import { TypeOf, z } from "zod"

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

type Props = {}

const CreateCountry = (props: Props) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const createCountryMutation = useCreateCountryMutation(graphqlRequestClient, {
    onSuccess: () => {
      setOpen(false)
    }
  })

  const CreateCountrySchema = z.object({
    name: persianInputSchema,
    nameEn: englishInputSchema,
    slug: slugInputSchema,
    alphaTwo: z.string().length(2),
    iso: z.string(),
    phonePrefix: z.string(),
    sort: z.number().optional().default(0),
    isActive: z.boolean().optional().default(true)
  })
  type CreateCountry = TypeOf<typeof CreateCountrySchema>

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CreateCountry>({
    resolver: zodResolver(CreateCountrySchema),
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

  function onSubmit(data: CreateCountry) {
    const { name, nameEn, alphaTwo, slug, phonePrefix, sort, isActive, iso } =
      data
    createCountryMutation.mutate({
      input: {
        name,
        nameEn,
        alphaTwo,
        slug,
        phonePrefix,
        sort,
        isActive,
        iso
      }
    })
  }

  return (
    <>
      <Button size="medium" onPress={() => setOpen(true)}>
        {t("common:add_entity", { entity: t("common:country") })}
      </Button>
      <Modal isDismissable isOpen={open} onOpenChange={setOpen}>
        <Dialog>
          <>
            <ModalHeader
              title={t("common:create_new_entity", {
                entity: t("common:country")
              })}
            />
            <ModalContent>
              {createCountryMutation.isError && <p>خطایی رخ داده</p>}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
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
                  <Input {...register("slug")} plaintext dir="ltr" />
                </TextField>
                <TextField
                  isDisabled={isSubmitting}
                  label={t("common:alpha_two_name")}
                  errorMessage={errors.alphaTwo && errors.alphaTwo.message}
                >
                  <Input {...register("alphaTwo")} />
                </TextField>
                <TextField
                  isDisabled={isSubmitting}
                  label={t("common:iso_name")}
                  errorMessage={errors.iso && errors.iso.message}
                >
                  <Input {...register("iso")} />
                </TextField>
                <TextField
                  isDisabled={isSubmitting}
                  label={t("common:phone_prefix")}
                  errorMessage={
                    errors.phonePrefix && errors.phonePrefix.message
                  }
                >
                  <Input {...register("phonePrefix")} />
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
                  label={t("common:is_active")}
                  name="isActive"
                  //   @ts-ignore
                  control={control}
                  errorMessage={errors.isActive && errors.isActive.message}
                />
                <div className="flex items-center justify-end gap-2">
                  <Button
                    intent="ghost"
                    isDisabled={isSubmitting}
                    onPress={() => setOpen(false)}
                  >
                    {t("common:cancel")}
                  </Button>
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    isDisabled={isSubmitting}
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

export default CreateCountry
