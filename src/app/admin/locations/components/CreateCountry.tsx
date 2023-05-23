"use client"

import { useCreateCountryMutation } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import {
  persianInputSchema,
  slugInputSchema
} from "@core/utils/zodValidationSchemas"

import { useState } from "react"
import { DialogTrigger } from "react-aria-components"
import { TypeOf, z } from "zod"

import { Button } from "@core/components/Button"
import CheckboxField from "@core/components/CheckboxField"
import { Dialog } from "@core/components/Dialog"
import { Input } from "@core/components/Input"
import { Modal, ModalContent } from "@core/components/Modal"
import { TextField } from "@core/components/TextField"
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
    nameEn: z.string(),
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
    formState: { errors }
  } = useForm<CreateCountry>({
    resolver: zodResolver(CreateCountrySchema)
  })
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
    <DialogTrigger>
      <Button size="medium">
        {t("common:add_entity", { entity: t("common:country") })}
      </Button>
      <Modal>
        <Dialog>
          {({ close }) => (
            <ModalContent>
              {createCountryMutation.isError && <p>خطایی رخ داده</p>}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
                noValidate
              >
                <TextField
                  label={t("common:name")}
                  errorMessage={errors.name && errors.name.message}
                >
                  <Input {...register("name")} />
                </TextField>
                <TextField
                  label={t("common:english_name")}
                  errorMessage={errors.nameEn && errors.nameEn.message}
                >
                  <Input {...register("nameEn")} />
                </TextField>
                <TextField
                  label={t("common:slug")}
                  errorMessage={errors.slug && errors.slug.message}
                >
                  <Input {...register("slug")} />
                </TextField>
                <TextField
                  label={t("common:alpha_two_name")}
                  errorMessage={errors.alphaTwo && errors.alphaTwo.message}
                >
                  <Input {...register("alphaTwo")} />
                </TextField>
                <TextField
                  label={t("common:iso_name")}
                  errorMessage={errors.iso && errors.iso.message}
                >
                  <Input {...register("iso")} />
                </TextField>
                <TextField
                  label={t("common:phone_prefix")}
                  errorMessage={
                    errors.phonePrefix && errors.phonePrefix.message
                  }
                >
                  <Input {...register("phonePrefix")} />
                </TextField>
                <TextField
                  label={t("common:display_sort")}
                  type="number"
                  errorMessage={errors.sort && errors.sort.message}
                >
                  <Input {...register("sort")} />
                </TextField>
                <CheckboxField
                  label={t("common:is_active")}
                  name="isActive"
                  //   @ts-ignore
                  control={control}
                  errorMessage={errors.isActive && errors.isActive.message}
                />
                <div className="flex items-center justify-end gap-2">
                  <Button intent="ghost" onPress={close}>
                    {t("common:cancel")}
                  </Button>
                  <Button type="submit">{t("common:submit")}</Button>
                </div>
              </form>
            </ModalContent>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  )
}

export default CreateCountry
