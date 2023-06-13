"use client"

import { useCreateUomMutation } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/Button"
import { Input } from "@core/components/Input"
import { Switch } from "@core/components/Switch"
import { TextField } from "@core/components/TextField"
import { toastQueue } from "@core/components/Toast"
import { slugInputSchema } from "@core/utils/zodValidationSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

const CreateUOM = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const createUOMMutation = useCreateUomMutation(graphqlRequestClient, {
    onSuccess: () => {
      toastQueue.add(
        t("common:entity_added_successfully", {
          entity: t("common:brand")
        }),
        {
          timeout: 2000,
          intent: "success"
        }
      )
      router.push("/admin/uoms")
    }
  })

  const CreateUOMSchema = z.object({
    name: z.string(),
    symbol: z.string(),
    slug: slugInputSchema,
    isActive: z.boolean().optional().default(true)
  })
  type CreateUOMType = TypeOf<typeof CreateUOMSchema>

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateUOMType>({
    resolver: zodResolver(CreateUOMSchema),
    defaultValues: {
      isActive: true
    }
  })

  const name = watch("name")

  function onSubmit(data: CreateUOMType) {
    const { name, slug, isActive, symbol } = data

    createUOMMutation.mutate({
      createUomInput: {
        name,
        slug,
        isActive,
        symbol
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6 mt-8 flex items-end justify-between">
          <h1 className="text-3xl font-black text-gray-800">
            {name ? name : t("common:new_entity", { entity: t("common:uom") })}
          </h1>
          <Button
            className="sticky top-0"
            type="submit"
            loading={isSubmitting}
            isDisabled={isSubmitting}
          >
            {t("common:save_entity", { entity: t("common:uom") })}
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
            label={t("common:symbol")}
            isDisabled={isSubmitting}
            errorMessage={errors.symbol && errors.symbol.message}
          >
            <Input {...register("symbol")} />
          </TextField>
          <TextField
            label={t("common:slug")}
            isDisabled={isSubmitting}
            errorMessage={errors.slug && errors.slug.message}
          >
            <Input {...register("slug")} />
          </TextField>
          <Controller
            name="isActive"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Switch
                ref={field.ref}
                name={field.name}
                isSelected={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                {t("common:is_active")}
              </Switch>
            )}
          />
        </div>
      </form>
    </div>
  )
}

export default CreateUOM
