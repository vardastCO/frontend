"use client"

import { Button } from "@core/components/Button"
import { Item } from "@core/components/Collection"
import { Input } from "@core/components/Input"
import { ListBox } from "@core/components/ListBox"
import { Popover } from "@core/components/Popover"
import { Select } from "@core/components/Select"
import { Switch } from "@core/components/Switch"
import { TextField } from "@core/components/TextField"
import { slugInputSchema } from "@core/utils/zodValidationSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { Controller, useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

const CreateAttribute = () => {
  const { t } = useTranslation()
  const CreateAttributeSchema = z.object({
    name: z.string(),
    slug: slugInputSchema,
    type: z.string(),
    isVisible: z.boolean(),
    isFilterable: z.boolean(),
    isRequired: z.boolean()
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

  return (
    <div>
      <div className="mb-6 mt-8 flex items-end justify-between">
        <h1 className="text-3xl font-black text-gray-800">
          {name
            ? name
            : t("common:new_entity", { entity: t("common:attribute") })}
        </h1>
        <Button className="sticky top-0">{t("common:save")}</Button>
      </div>
      <form>
        <div className="flex flex-col gap-6">
          <TextField label={t("common:name")}>
            <Input {...register("name")} />
          </TextField>

          <TextField label={t("common:id")}>
            <Input {...register("slug")} />
          </TextField>

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                label={t("common:type")}
                onBlur={field.onBlur}
                onSelectionChange={field.onChange}
                placeholder={t("common:select_placeholder")}
              >
                <Popover>
                  <ListBox>
                    <Item id="text">Text</Item>
                    <Item id="textarea">Textarea</Item>
                    <Item id="select">Select</Item>
                    <Item id="checkbox">Checkbox</Item>
                    <Item id="radio">Radio</Item>
                    <Item id="image">Image</Item>
                    <Item id="file">File</Item>
                    <Item id="number">Number</Item>
                    <Item id="currency">Currency</Item>
                  </ListBox>
                </Popover>
              </Select>
            )}
          />

          <Controller
            name="isVisible"
            control={control}
            render={({ field }) => (
              <Switch
                isSelected={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                {t("common:visible")}
              </Switch>
            )}
          />
          <Controller
            name="isFilterable"
            control={control}
            render={({ field }) => (
              <Switch
                isSelected={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                {t("common:filterable")}
              </Switch>
            )}
          />
          <Controller
            name="isRequired"
            control={control}
            render={({ field }) => (
              <Switch
                isSelected={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                {t("common:required")}
              </Switch>
            )}
          />
        </div>
      </form>
    </div>
  )
}

export default CreateAttribute
