"use client"

import { Button } from "@core/components/Button"
import { Input } from "@core/components/Input"
import { TextField } from "@core/components/TextField"
import { slugInputSchema } from "@core/utils/zodValidationSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

const CreateUOM = () => {
  const { t } = useTranslation()
  const CreateUOMSchema = z.object({
    name: z.string(),
    slug: slugInputSchema
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
    defaultValues: {}
  })

  const name = watch("name")

  return (
    <div>
      <div className="mb-6 mt-8 flex items-end justify-between">
        <h1 className="text-3xl font-black text-gray-800">
          {name ? name : t("common:new_entity", { entity: t("common:uom") })}
        </h1>
        <Button className="sticky top-0">{t("common:save_entity", { entity: t("common:uom") })}</Button>
      </div>
      <form>
        <div className="flex flex-col gap-6">
          <TextField label={t("common:name")}>
            <Input {...register("name")} />
          </TextField>

          <TextField label={t("common:id")}>
            <Input {...register("slug")} />
          </TextField>
        </div>
      </form>
    </div>
  )
}

export default CreateUOM
