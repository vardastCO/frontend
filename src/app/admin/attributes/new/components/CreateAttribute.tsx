"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { Controller, useForm } from "react-hook-form"
import { TypeOf, z } from "zod"
import { AttributeTypesEnum, useCreateAttributeMutation } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { enumToKeyValueObject } from "@core/utils/enumToKeyValueObject"
import { slugInputSchema } from "@core/utils/zodValidationSchemas"
import { Button } from "@core/components/Button"
import { Item } from "@core/components/Collection"
import { Input } from "@core/components/Input"
import { ListBox } from "@core/components/ListBox"
import { Popover } from "@core/components/Popover"
import { Select } from "@core/components/Select"
import { TextField } from "@core/components/TextField"
import { toastQueue } from "@core/components/Toast"

const CreateAttribute = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const attributeTypes = enumToKeyValueObject(AttributeTypesEnum)

  const createAttributeMutation = useCreateAttributeMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        toastQueue.add(
          t("common:entity_added_successfully", {
            entity: t("common:attribute")
          }),
          {
            timeout: 2000,
            intent: "success"
          }
        )
        router.push("/admin/attributes")
      }
    }
  )

  const CreateAttributeSchema = z.object({
    name: z.string(),
    slug: slugInputSchema,
    type: z.nativeEnum(AttributeTypesEnum)
  })
  type CreateAttributeType = TypeOf<typeof CreateAttributeSchema>

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateAttributeType>({
    resolver: zodResolver(CreateAttributeSchema),
    defaultValues: {}
  })

  const name = watch("name")

  function onSubmit(data: CreateAttributeType) {
    const { name, slug, type } = data

    createAttributeMutation.mutate({
      createAttributeInput: {
        name,
        slug,
        type
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6 mt-8 flex items-end justify-between">
          <h1 className="text-3xl font-black text-gray-800">
            {name
              ? name
              : t("common:new_entity", { entity: t("common:attribute") })}
          </h1>
          <Button
            className="sticky top-0"
            type="submit"
            loading={isSubmitting}
            isDisabled={isSubmitting}
          >
            {t("common:save_entity", { entity: t("common:attribute") })}
          </Button>
        </div>
        <div className="flex flex-col gap-6">
          <TextField
            label={t("common:name")}
            isDisabled={isSubmitting}
            errorMessage={errors.name && errors.name.message}
          >
            <Input {...register("name")} />
          </TextField>

          <TextField
            label={t("common:slug")}
            isDisabled={isSubmitting}
            errorMessage={errors.slug && errors.slug.message}
          >
            <Input {...register("slug")} />
          </TextField>

          <Controller
            name="type"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Select
                label={t("common:type")}
                onBlur={field.onBlur}
                isDisabled={isSubmitting}
                errorMessage={error && error.message}
                onSelectionChange={field.onChange}
                placeholder={t("common:select_placeholder")}
              >
                <Popover>
                  <ListBox>
                    {Object.keys(attributeTypes).map((type) => (
                      <Item id={attributeTypes[type]} key={type}>
                        {type}
                      </Item>
                    ))}
                  </ListBox>
                </Popover>
              </Select>
            )}
          />
        </div>
      </form>
    </div>
  )
}

export default CreateAttribute
