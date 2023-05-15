"use client"

import { useCreateCountryMutation } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import {
  persianInputSchema,
  slugSchema
} from "@core/utils/tsReactFormDefaultMapping"

import { useState } from "react"
import { DialogTrigger } from "react-aria-components"
import { TypeOf, z } from "zod"

import CheckboxField from "@core/components/form/CheckboxField"
import TextField from "@core/components/form/TextField"
import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { Button } from "../../../../@core/components/ui/Button"
import { Dialog } from "../../../../@core/components/ui/Dialog"
import { Modal, ModalContent } from "../../../../@core/components/ui/Modal"

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
    slug: slugSchema,
    alphaTwo: z.string().length(2),
    iso: z.string(),
    phonePrefix: z.string(),
    sort: z.number().optional().default(0),
    isActive: z.boolean().optional().default(true)
  })
  type CreateCountry = TypeOf<typeof CreateCountrySchema>

  const {
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
                  type="text"
                  name="name"
                  control={control}
                  errorMessage={errors.name && errors.name.message}
                />
                <TextField
                  label={t("common:englishName")}
                  type="text"
                  name="nameEn"
                  control={control}
                  errorMessage={errors.nameEn && errors.nameEn.message}
                />
                <TextField
                  label={t("common:slug")}
                  type="text"
                  name="slug"
                  control={control}
                  errorMessage={errors.slug && errors.slug.message}
                />
                <TextField
                  label={t("common:alphaTwoName")}
                  type="text"
                  name="alphaTwo"
                  control={control}
                  errorMessage={errors.alphaTwo && errors.alphaTwo.message}
                />
                <TextField
                  label={t("common:isoName")}
                  type="text"
                  name="iso"
                  control={control}
                  errorMessage={errors.iso && errors.iso.message}
                />
                <TextField
                  label={t("common:phonePrefix")}
                  type="text"
                  name="phonePrefix"
                  control={control}
                  errorMessage={
                    errors.phonePrefix && errors.phonePrefix.message
                  }
                />
                <TextField
                  label={t("common:displaySort")}
                  type="number"
                  name="sort"
                  control={control}
                  errorMessage={errors.sort && errors.sort.message}
                />
                <CheckboxField
                  label={t("common:isActive")}
                  name="isActive"
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
