"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@radix-ui/react-popover"
import { useQueryClient } from "@tanstack/react-query"
import { ClientError } from "graphql-request"
import {
  LucideAlertOctagon,
  LucideCheck,
  LucideChevronsUpDown
} from "lucide-react"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import {
  Attribute,
  useCreateAttributeValueMutation,
  useGetAttributesOfACategoryQuery
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { mergeClasses } from "@core/utils/mergeClasses"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@core/components/react-hook-form/form"
import { Alert, AlertDescription, AlertTitle } from "@core/components/ui/alert"
import { Button } from "@core/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@core/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@core/components/ui/dialog"
import { Input } from "@core/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@core/components/ui/select"
import { Switch } from "@core/components/ui/switch"
import { toast } from "@core/hooks/use-toast"

type CreateAttributeModalProps = {
  productId: number
  categoryId: number
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
}

const CreateAttributeModal = ({
  open,
  onOpenChange,
  productId,
  categoryId
}: CreateAttributeModalProps) => {
  const { t } = useTranslation()
  const [attributeOpen, setAttributeOpen] = useState<boolean>(false)
  const [selectAttribute, setSelectAttribute] = useState<Attribute>()
  const [errors, setErrors] = useState<ClientError>()

  const queryClient = useQueryClient()
  const attributes = useGetAttributesOfACategoryQuery(graphqlRequestClient, {
    id: categoryId
  })
  const createAttributeValueMutation = useCreateAttributeValueMutation(
    graphqlRequestClient,
    {
      onError: (errors: ClientError) => {
        setErrors(errors)
      },
      onSuccess: () => {
        form.reset()
        queryClient.invalidateQueries({
          queryKey: ["GetProduct", { id: productId }]
        })
        toast({
          description: t("common:entity_added_successfully", {
            entity: t("common:attribute")
          }),
          duration: 2000,
          variant: "success"
        })
        onOpenChange(false)
      }
    }
  )

  const CreateAttributeSchema = z
    .object({
      attributeId: z.number(),
      sku: z.string().optional(),
      value: z.string(),
      isVariant: z.boolean().optional().default(false)
    })
    .refine((schema) => (schema.isVariant ? !!schema.sku : true), {
      path: ["sku"],
      message: t("zod:errors.invalid_type_received_undefined")
    })
  type CreateAttribute = TypeOf<typeof CreateAttributeSchema>

  const form = useForm<CreateAttribute>({
    resolver: zodResolver(CreateAttributeSchema),
    defaultValues: {}
  })

  const onClose = () => {
    form.reset()
    onOpenChange(false)
  }

  function onSubmit(data: CreateAttribute) {
    const { attributeId, isVariant, sku, value } = data

    createAttributeValueMutation.mutate({
      createAttributeValueInput: {
        attributeId,
        isVariant,
        productId,
        sku,
        value
      }
    })
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("common:add_entity", {
              entity: t("common:attribute")
            })}
          </DialogTitle>
        </DialogHeader>
        {errors && (
          <Alert variant="danger">
            <LucideAlertOctagon />
            <AlertTitle>خطا</AlertTitle>
            <AlertDescription>
              {(
                errors.response.errors?.at(0)?.extensions
                  .displayErrors as string[]
              ).map((error) => (
                <p key={error}>{error}</p>
              ))}
            </AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6 py-8">
              <FormField
                control={form.control}
                name="attributeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:attribute")}</FormLabel>
                    <Popover
                      open={attributeOpen}
                      onOpenChange={setAttributeOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={
                              attributes.isLoading || attributes.isError
                            }
                            noStyle
                            role="combobox"
                            className="input-field flex items-center text-start"
                          >
                            {field.value
                              ? attributes.data?.category.attributes.find(
                                  (attribute) =>
                                    attribute && attribute.id === field.value
                                )?.name
                              : t("common:choose_entity", {
                                  entity: t("common:attribute")
                                })}
                            <LucideChevronsUpDown className="ms-auto h-4 w-4 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="z-[9999]">
                        <Command>
                          <CommandInput
                            placeholder={t("common:search_entity", {
                              entity: t("common:attribute")
                            })}
                          />
                          <CommandEmpty>
                            {t("common:no_entity_found", {
                              entity: t("common:attribute")
                            })}
                          </CommandEmpty>
                          <CommandGroup>
                            {attributes.data?.category.attributes.map(
                              (attribute) =>
                                attribute && (
                                  <CommandItem
                                    value={attribute.name}
                                    key={attribute.id}
                                    onSelect={(value) => {
                                      setSelectAttribute(() => {
                                        const item =
                                          attributes.data?.category.attributes.find(
                                            (item) =>
                                              item &&
                                              item.name.toLowerCase() === value
                                          ) as Attribute
                                        form.setValue("attributeId", item.id)
                                        setAttributeOpen(false)
                                        return item
                                      })
                                    }}
                                  >
                                    <LucideCheck
                                      className={mergeClasses(
                                        "mr-2 h-4 w-4",
                                        attribute.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {attribute.name}
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
              {selectAttribute && selectAttribute.type === "TEXT" && (
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("common:value")}</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {selectAttribute && selectAttribute.type === "SELECT" && (
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("common:value")}</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          form.setValue("value", value)
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
                        <SelectContent className="z-[9999]">
                          {selectAttribute.values?.options.map(
                            (option: string) => (
                              <SelectItem value={option} key={option}>
                                {option}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="isVariant"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel noStyle>
                        {t("common:is_product_variant")}
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("isVariant") === true && (
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("common:product_sku")}</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <DialogFooter>
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  type="button"
                  disabled={form.formState.isSubmitting}
                  onClick={() => onClose()}
                >
                  {t("common:cancel")}
                </Button>
                <Button
                  type="submit"
                  loading={form.formState.isSubmitting}
                  disabled={form.formState.isSubmitting}
                >
                  {t("common:submit")}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateAttributeModal
