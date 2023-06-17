"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"
import { AttributeTypesEnum, useCreateAttributeMutation } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { enumToKeyValueObject } from "@core/utils/enumToKeyValueObject"
import { slugInputSchema } from "@core/utils/zodValidationSchemas"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@core/components/react-hook-form/form"
import { Button } from "@core/components/ui/button"
import { Input } from "@core/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@core/components/ui/select"
import { useToast } from "@core/hooks/use-toast"

const CreateAttribute = () => {
  const { t } = useTranslation()
  const { toast } = useToast()
  const router = useRouter()
  const attributeTypes = enumToKeyValueObject(AttributeTypesEnum)

  const createAttributeMutation = useCreateAttributeMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        toast({
          description: t("common:entity_added_successfully", {
            entity: t("common:attribute")
          }),
          duration: 2000,
          variant: "success"
        })
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

  const form = useForm<CreateAttributeType>({
    resolver: zodResolver(CreateAttributeSchema),
    defaultValues: {}
  })

  const name = form.watch("name")

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="mb-6 mt-8 flex items-end justify-between">
          <h1 className="text-3xl font-black text-gray-800">
            {name
              ? name
              : t("common:new_entity", { entity: t("common:attribute") })}
          </h1>
          <Button
            className="sticky top-0"
            type="submit"
            loading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            {t("common:save_entity", { entity: t("common:attribute") })}
          </Button>
        </div>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common:name")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common:slug")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common:type")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(attributeTypes).map((type) => (
                      <SelectItem value={attributeTypes[type]} key={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <Controller
            name="type"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Select
                label={t("common:type")}
                onBlur={field.onBlur}
                disabled={isSubmitting}
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
          /> */}
        </div>
      </form>
    </Form>
  )
}

export default CreateAttribute
