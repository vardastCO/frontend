"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { LucideCheck, LucideChevronsUpDown } from "lucide-react"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import {
  Attribute,
  AttributeTypesEnum,
  useCreateAttributeMutation,
  useGetAllUomsWithoutPaginationQuery
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { enumToKeyValueObject } from "@core/utils/enumToKeyValueObject"
import { mergeClasses } from "@core/utils/mergeClasses"
import zodI18nMap from "@core/utils/zodErrorMap"
import { jsonSchema, slugInputSchema } from "@core/utils/zodValidationSchemas"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@core/components/react-hook-form/form"
import { Button } from "@core/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@core/components/ui/command"
import { Input } from "@core/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@core/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@core/components/ui/select"
import { Switch } from "@core/components/ui/switch"
import { TagInput } from "@core/components/ui/tag-input"
import { Textarea } from "@core/components/ui/textarea"
import { useToast } from "@core/hooks/use-toast"

type AttributeFormProps = {
  attribute?: Attribute
}

const AttributeForm = ({ attribute }: AttributeFormProps) => {
  const { t } = useTranslation()
  const { toast } = useToast()
  const router = useRouter()
  const [radioValues, setRadioValues] = useState<string[]>([])
  const [checkboxValues, setCheckboxValues] = useState<string[]>([])
  const [checkboxCheckedValues, setCheckboxCheckedValues] = useState<string[]>(
    []
  )
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

  z.setErrorMap(zodI18nMap)
  const CreateAttributeSchema = z
    .object({
      name: z.string().min(1),
      slug: slugInputSchema,
      type: z.nativeEnum(AttributeTypesEnum),
      uomId: z.number().optional(),
      textDefaultValue: z.string().optional(),
      textareaDefaultValue: z.string().optional(),
      checkboxOptions: jsonSchema.optional(),
      checkboxCheckedOptions: jsonSchema.optional(),
      radioOptions: jsonSchema.optional(),
      radioDefaultOption: z.string().optional(),
      selectOptions: jsonSchema.optional(),
      selectDefaultOption: z.string().optional(),
      isPublic: z.boolean().optional(),
      isFilterable: z.boolean().optional(),
      isRequired: z.boolean().optional()
    })
    .refine(
      (schema) =>
        schema.type === "CHECKBOX" ? !!schema.checkboxOptions : true,
      {
        path: ["checkboxOptions"],
        message: t("zod:errors.invalid_type_received_undefined")
      }
    )
    .refine(
      (schema) => (schema.type === "RADIO" ? !!schema.radioOptions : true),
      {
        path: ["radioOptions"],
        message: t("zod:errors.invalid_type_received_undefined")
      }
    )
    .refine(
      (schema) => (schema.type === "SELECT" ? !!schema.selectOptions : true),
      {
        path: ["selectOptions"],
        message: t("zod:errors.invalid_type_received_undefined")
      }
    )
  type CreateAttributeType = TypeOf<typeof CreateAttributeSchema>

  const form = useForm<CreateAttributeType>({
    resolver: zodResolver(CreateAttributeSchema),
    defaultValues: {
      name: attribute?.name,
      slug: attribute?.slug,
      type: attribute?.type,
      uomId: attribute?.uom?.id,
      //   selectOptions: attribute?.values?.options,
      isRequired: attribute?.isRequired,
      isFilterable: attribute?.isFilterable,
      isPublic: attribute?.isPublic
    }
  })

  const name = form.watch("name")
  const type = form.watch("type")

  function onSubmit(data: CreateAttributeType) {
    const { name, slug, type } = data
    let values
    switch (type) {
      case "CHECKBOX":
        values = data.checkboxOptions
        break
      case "RADIO":
        values = data.radioOptions
        break
      case "SELECT":
        values = data.selectOptions
        break
      case "TEXT":
        values = data.textDefaultValue
        break
      case "TEXTAREA":
        values = data.textareaDefaultValue
        break
    }
    createAttributeMutation.mutate({
      createAttributeInput: {
        name,
        slug,
        type,
        values
      }
    })
  }

  const uoms = useGetAllUomsWithoutPaginationQuery(graphqlRequestClient)

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
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common:name")}</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
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
                  <Input type="text" {...field} />
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
                  onValueChange={(value) => {
                    form.setValue("type", value as AttributeTypesEnum)
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("common:select_placeholder")}
                      />
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

          <FormField
            control={form.control}
            name="uomId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common:uom")}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={uoms.isLoading || uoms.isError}
                        noStyle
                        role="combobox"
                        className="input-field flex items-center text-start"
                      >
                        {field.value
                          ? uoms.data?.uomsWithoutPagination.find(
                              (uom) => uom && uom.id === field.value
                            )?.name
                          : t("common:choose_entity", {
                              entity: t("common:uom")
                            })}
                        <LucideChevronsUpDown className="ms-auto h-4 w-4 shrink-0" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Command>
                      <CommandInput
                        placeholder={t("common:search_entity", {
                          entity: t("common:uom")
                        })}
                      />
                      <CommandEmpty>
                        {t("common:no_entity_found", {
                          entity: t("common:uom")
                        })}
                      </CommandEmpty>
                      <CommandGroup>
                        {uoms.data?.uomsWithoutPagination.map(
                          (uom) =>
                            uom && (
                              <CommandItem
                                value={uom.name}
                                key={uom.id}
                                onSelect={(value) => {
                                  form.setValue(
                                    "uomId",
                                    uoms.data?.uomsWithoutPagination.find(
                                      (item) =>
                                        item &&
                                        item.name.toLowerCase() === value
                                    )?.id || 0
                                  )
                                }}
                              >
                                <LucideCheck
                                  className={mergeClasses(
                                    "mr-2 h-4 w-4",
                                    uom.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {uom.name}
                              </CommandItem>
                            )
                        )}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {type && (
            <div className="col-span-full flex flex-col gap-6">
              {type === "CHECKBOX" && (
                <>
                  <FormField
                    control={form.control}
                    name="checkboxOptions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("common:entity_options", {
                            entity: t("common:checkbox")
                          })}
                        </FormLabel>
                        <FormControl>
                          <TagInput
                            tags={checkboxValues}
                            onAddition={(item) => {
                              setCheckboxValues((prevValues) => {
                                const newValues = [...prevValues, item]
                                form.setValue("checkboxOptions", newValues)
                                return newValues
                              })
                            }}
                            onDelete={(idx) => {
                              setCheckboxValues((prevValues) => {
                                const newValues = prevValues.filter(
                                  (item, index) => index !== idx
                                )
                                form.setValue("checkboxOptions", newValues)
                                return newValues
                              })
                            }}
                            placeholder={t(
                              "common:entity_comma_separated_options_placeholder",
                              {
                                entity: t("common:checkbox")
                              }
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="checkboxCheckedOptions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("common:default_checked")}</FormLabel>
                        <FormControl>
                          <TagInput
                            tags={checkboxCheckedValues}
                            onAddition={(item) => {
                              setCheckboxCheckedValues((prevValues) => {
                                const newValues = [...prevValues, item]
                                form.setValue(
                                  "checkboxCheckedOptions",
                                  newValues
                                )
                                return newValues
                              })
                            }}
                            onDelete={(idx) => {
                              setCheckboxCheckedValues((prevValues) => {
                                const newValues = prevValues.filter(
                                  (item, index) => index !== idx
                                )
                                form.setValue(
                                  "checkboxCheckedOptions",
                                  newValues
                                )
                                return newValues
                              })
                            }}
                            placeholder={`${t(
                              "common:entity_comma_separated_default_checked_placeholder",
                              {
                                entity: t("common:checkbox")
                              }
                            )} (${t("common:optional")})`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {type === "RADIO" && (
                <>
                  <FormField
                    control={form.control}
                    name="radioOptions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("common:entity_options", {
                            entity: t("common:radio")
                          })}
                        </FormLabel>
                        <FormControl>
                          <TagInput
                            tags={radioValues}
                            onAddition={(item) => {
                              setRadioValues((prevValues) => {
                                const newValues = [...prevValues, item]
                                form.setValue("radioOptions", newValues)
                                return newValues
                              })
                            }}
                            onDelete={(idx) => {
                              setRadioValues((prevValues) => {
                                const newValues = prevValues.filter(
                                  (item, index) => index !== idx
                                )
                                form.setValue("radioOptions", newValues)
                                return newValues
                              })
                            }}
                            placeholder={t(
                              "common:entity_comma_separated_options_placeholder",
                              {
                                entity: t("common:radio")
                              }
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="radioDefaultOption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("common:default_value")}</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={`${t(
                                    "common:select_default_entity_value_placeholder",
                                    {
                                      entity: t("common:radio")
                                    }
                                  )} (${t("common:optional")})`}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.keys(attributeTypes).map((type) => (
                                <SelectItem
                                  value={attributeTypes[type]}
                                  key={type}
                                >
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {type === "SELECT" && (
                <>
                  <FormField
                    control={form.control}
                    name="selectOptions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("common:entity_options", {
                            entity: t("common:select_box")
                          })}
                        </FormLabel>
                        <FormControl>
                          <TagInput
                            tags={checkboxValues}
                            onAddition={(item) => {
                              setCheckboxValues((prevValues) => [
                                ...prevValues,
                                item
                              ])
                            }}
                            onDelete={(idx) => {
                              setCheckboxValues((prevValues) =>
                                prevValues.filter(
                                  (item, index) => index !== idx
                                )
                              )
                            }}
                            placeholder={t(
                              "common:entity_comma_separated_options_placeholder",
                              {
                                entity: t("common:select_box")
                              }
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="selectDefaultOption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("common:default_value")}</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={`${t(
                                    "common:select_default_entity_value_placeholder",
                                    {
                                      entity: t("common:select_box")
                                    }
                                  )} (${t("common:optional")})`}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.keys(attributeTypes).map((type) => (
                                <SelectItem
                                  value={attributeTypes[type]}
                                  key={type}
                                >
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {type === "TEXT" && (
                <FormField
                  control={form.control}
                  name="textDefaultValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("common:default_text")}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={t("common:optional")} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {type === "TEXTAREA" && (
                <FormField
                  control={form.control}
                  name="textareaDefaultValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("common:default_text")}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t("common:optional")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-1">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel noStyle>{t("common:visibility")}</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFilterable"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-1">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel noStyle>{t("common:filterable")}</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isRequired"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-1">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel noStyle>{t("common:required")}</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {attribute && (
          <div className="mt-12">
            <h1 className="mb-8 text-lg font-bold text-gray-800">
              {t("common:categories")}
            </h1>
            <div className="card table-responsive rounded">
              <table className="table">
                <thead>
                  <tr>
                    <th>{t("common:title")}</th>
                  </tr>
                </thead>
                <tbody>
                  {attribute.categories.map(
                    (category) =>
                      category && (
                        <tr key={category.id}>
                          <td>{category.title}</td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </form>
    </Form>
  )
}

export default AttributeForm
