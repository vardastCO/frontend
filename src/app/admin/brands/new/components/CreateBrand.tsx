"use client"

import { useCreateBrandMutation } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/Button"
import { Input } from "@core/components/Input"
import { TextField } from "@core/components/TextField"
import { toastQueue } from "@core/components/Toast"
import { slugInputSchema } from "@core/utils/zodValidationSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

const CreateBrand = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const createBrandMutation = useCreateBrandMutation(graphqlRequestClient, {
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
      router.push("/admin/brands")
    }
  })

  const CreateBrandSchema = z.object({
    name: z.string(),
    slug: slugInputSchema
  })
  type CreateBrandType = TypeOf<typeof CreateBrandSchema>

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<CreateBrandType>({
    resolver: zodResolver(CreateBrandSchema),
    defaultValues: {}
  })

  const name = watch("name")

  function onSubmit(data: CreateBrandType) {
    const { name, slug } = data

    createBrandMutation.mutate({
      createBrandInput: {
        name,
        slug
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
              : t("common:new_entity", { entity: t("common:brand") })}
          </h1>
          <Button
            className="sticky top-0"
            type="submit"
            loading={isSubmitting}
            isDisabled={isSubmitting}
          >
            {t("common:save_entity", { entity: t("common:brand") })}
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
        </div>
      </form>
    </div>
  )
}

export default CreateBrand
