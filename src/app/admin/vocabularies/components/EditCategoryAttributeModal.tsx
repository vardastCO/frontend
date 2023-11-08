"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { notFound } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ClientError } from "graphql-request"
import { LucideAlertOctagon } from "lucide-react"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import {
  Category,
  useGetAllFilterableAdminAttributesQuery,
  useUpdateAttributeMutation
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import zodI18nMap from "@core/utils/zodErrorMap"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@core/components/react-hook-form/form"
import Link from "@core/components/shared/Link"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import { Alert, AlertDescription, AlertTitle } from "@core/components/ui/alert"
import { Button } from "@core/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@core/components/ui/dialog"
import { Switch } from "@core/components/ui/switch"
import { useToast } from "@core/hooks/use-toast"

type AttributeFormProps = {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  category?: Category
}

type AttributeItemFormProps = {
  category: {
    __typename?: "Attribute"
    id: number
    name: string
    isPublic: boolean
    isRequired: boolean
    isFilterable: boolean
    values?: {
      __typename?: "AttributeValues"
      options?: any | null
      defaults?: Array<string> | null
    } | null
  } | null
}

const EditCategoryAttributeModal = ({
  open,
  onOpenChange,
  category
}: AttributeFormProps) => {
  const { t } = useTranslation()

  const uetAllFilterableAdminAttributesQuery =
    useGetAllFilterableAdminAttributesQuery(graphqlRequestClient, {
      filterableAttributesInput: {
        categoryId: category?.id ?? 0
      }
    })

  const onClose = () => {
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("common:edit_entity", { entity: t("common:attributes") })}
            </DialogTitle>
            <Link
              className="flex justify-center"
              href={`/admin/attributes/new/${category?.id ? category?.id : ""}`}
            >
              <Button size="medium">
                {t("common:add_entity", { entity: t("common:attribute") })}
              </Button>
            </Link>
          </DialogHeader>
          <div className="flex flex-col divide-y">
            {uetAllFilterableAdminAttributesQuery.isLoading ? (
              <Loading />
            ) : !!uetAllFilterableAdminAttributesQuery.error ? (
              <LoadingFailed />
            ) : !uetAllFilterableAdminAttributesQuery.data ? (
              notFound()
            ) : uetAllFilterableAdminAttributesQuery.data
                ?.filterableAdminAttributes.filters.length ? (
              uetAllFilterableAdminAttributesQuery.data?.filterableAdminAttributes.filters.map(
                (categoryItem) => (
                  <AttributeItem
                    category={categoryItem}
                    key={categoryItem?.id}
                  />
                )
              )
            ) : (
              <p className="text-center font-bold text-error">
                فیلتری یافت نشد
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

const AttributeItem = ({ category }: AttributeItemFormProps) => {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [errors, setErrors] = useState<ClientError>()

  z.setErrorMap(zodI18nMap)
  const CreateAttributeSchema = z.object({
    id: z.number(),
    isPublic: z.boolean().optional(),
    isFilterable: z.boolean().optional(),
    isRequired: z.boolean().optional()
  })

  type CreateAttributeType = TypeOf<typeof CreateAttributeSchema>

  const form = useForm<CreateAttributeType>({
    resolver: zodResolver(CreateAttributeSchema),
    defaultValues: {
      id: category?.id,
      isRequired: category?.isRequired,
      isFilterable: category?.isFilterable,
      isPublic: category?.isPublic
    }
  })

  const updateAttributeMutation = useUpdateAttributeMutation(
    graphqlRequestClient,
    {
      onError: (errors: ClientError) => {
        setErrors(errors)
      },
      onSuccess: () => {
        toast({
          description: t("common:entity_updated_successfully", {
            entity: t("common:attribute")
          }),
          duration: 2000,
          variant: "success"
        })
      }
    }
  )

  function onSubmit(data: CreateAttributeType) {
    updateAttributeMutation.mutate({
      updateAttributeInput: data
    })
  }

  return (
    <Form {...form}>
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
      <form className="py-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="flex items-center gap-6">
          <Link
            href={`/admin/attributes/${category?.id}`}
            target="_blank"
            className="flex flex-1 flex-col"
          >
            <p className="font-bold">{category?.name}</p>
            <div className="pr pt">
              {category?.values?.options.map(
                (value: string, idx: number) =>
                  value && (
                    <span key={idx} className="inline-block leading-none">
                      {value}
                    </span>
                  )
              )}
            </div>
          </Link>
          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1">
                  <FormControl>
                    <Switch
                      type="submit"
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
                      type="submit"
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
                      type="submit"
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
      </form>
    </Form>
  )
}

export default EditCategoryAttributeModal
