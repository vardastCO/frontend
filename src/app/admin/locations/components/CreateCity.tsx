"use client"

import { useCreateCityMutation } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import {
  persianInputSchema,
  slugInputSchema
} from "@core/utils/zodValidationSchemas"
import { useQueryClient } from "@tanstack/react-query"

import { useState } from "react"
import { DialogTrigger } from "react-aria-components"
import { TypeOf, z } from "zod"

import { CityTypesEnum } from "@/generated"
import { Button } from "@core/components/Button"
import CheckboxField from "@core/components/CheckboxField"
import { Dialog } from "@core/components/Dialog"
import { Input } from "@core/components/Input"
import { Modal, ModalContent } from "@core/components/Modal"
import { TextField } from "@core/components/TextField"
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
    nameEn: z.string(),
    slug: slugInputSchema,
    sort: z.number().optional().default(0),
    isActive: z.boolean().optional().default(true)
  })
  type CreateCity = TypeOf<typeof CreateCitySchema>

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCity>({
    resolver: zodResolver(CreateCitySchema)
  })

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
    <DialogTrigger>
      <Button size="medium">
        {t("common:add_entity", { entity: t("common:city") })}
      </Button>
      <Modal>
        <Dialog>
          {({ close }) => (
            <ModalContent>
              {createProvinceMutation.isError && <p>خطایی رخ داده</p>}
              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <TextField
                  label={t("common:name")}
                  type="text"
                  name="name"
                  errorMessage={errors.name && errors.name.message}
                >
                  <Input {...register("name")} />
                </TextField>
                <TextField
                  label={t("common:english_name")}
                  type="text"
                  name="nameEn"
                  errorMessage={errors.nameEn && errors.nameEn.message}
                >
                  <Input {...register("nameEn")} />
                </TextField>
                <TextField
                  label={t("common:slug")}
                  type="text"
                  name="slug"
                  errorMessage={errors.slug && errors.slug.message}
                >
                  <Input {...register("slug")} />
                </TextField>
                <TextField
                  label={t("common:display_sort")}
                  type="number"
                  name="sort"
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

export default CreateCity
