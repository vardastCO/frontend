"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ClientError } from "graphql-request"
import { LucideAlertOctagon } from "lucide-react"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import { Uom, useCreateUomMutation, useUpdateUomMutation } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import zodI18nMap from "@core/utils/zodErrorMap"
import { slugInputSchema } from "@core/utils/zodValidationSchemas"
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
import { Input } from "@core/components/ui/input"
import { Switch } from "@core/components/ui/switch"
import { useToast } from "@core/hooks/use-toast"

type UOMFormProps = {
  uom?: Uom
}

const UOMForm = ({ uom }: UOMFormProps) => {
  const { t } = useTranslation()
  const { toast } = useToast()
  const router = useRouter()
  const [errors, setErrors] = useState<ClientError>()

  const createUOMMutation = useCreateUomMutation(graphqlRequestClient, {
    onError: (errors: ClientError) => {
      setErrors(errors)
    },
    onSuccess: () => {
      toast({
        description: t("common:entity_added_successfully", {
          entity: t("common:uom")
        }),
        duration: 2000,
        variant: "success"
      })
      router.push("/admin/uoms")
    }
  })
  const updateUOMMutation = useUpdateUomMutation(graphqlRequestClient, {
    onError: (errors: ClientError) => {
      setErrors(errors)
    },
    onSuccess: () => {
      toast({
        description: t("common:entity_updated_successfully", {
          entity: t("common:uom")
        }),
        duration: 2000,
        variant: "success"
      })
      router.push("/admin/uoms")
    }
  })

  z.setErrorMap(zodI18nMap)
  const CreateUOMSchema = z.object({
    name: z.string(),
    symbol: z.string(),
    slug: slugInputSchema,
    isActive: z.boolean().optional().default(true)
  })
  type CreateUOMType = TypeOf<typeof CreateUOMSchema>

  const form = useForm<CreateUOMType>({
    resolver: zodResolver(CreateUOMSchema),
    defaultValues: {
      isActive: uom?.isActive,
      name: uom?.name,
      symbol: uom?.symbol,
      slug: uom?.slug
    }
  })

  const name = form.watch("name")

  function onSubmit(data: CreateUOMType) {
    const { name, slug, isActive, symbol } = data

    if (uom) {
      updateUOMMutation.mutate({
        updateUomInput: {
          id: uom.id,
          name,
          slug,
          isActive,
          symbol
        }
      })
    } else {
      createUOMMutation.mutate({
        createUomInput: {
          name,
          slug,
          isActive,
          symbol
        }
      })
    }
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
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="mb-6 mt-8 flex items-end justify-between">
          <h1 className="text-3xl font-black text-gray-800">
            {name ? name : t("common:new_entity", { entity: t("common:uom") })}
          </h1>
          <Button
            className="sticky top-0"
            type="submit"
            loading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            {t("common:save_entity", { entity: t("common:uom") })}
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
            name="symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common:symbol")}</FormLabel>
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
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>{t("common:is_active")}</FormLabel>
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

export default UOMForm
