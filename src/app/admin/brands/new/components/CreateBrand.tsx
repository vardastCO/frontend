"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"
import { useCreateBrandMutation } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
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
import { useToast } from "@core/hooks/use-toast"

const CreateBrand = () => {
  const { t } = useTranslation()
  const { toast } = useToast()
  const router = useRouter()
  const createBrandMutation = useCreateBrandMutation(graphqlRequestClient, {
    onSuccess: () => {
      toast({
        description: t("common:entity_added_successfully", {
          entity: t("common:brand")
        }),
        duration: 2000,
        variant: "success"
      })
      router.push("/admin/brands")
    }
  })

  const CreateBrandSchema = z.object({
    name: z.string(),
    slug: slugInputSchema
  })
  type CreateBrandType = TypeOf<typeof CreateBrandSchema>

  const form = useForm<CreateBrandType>({
    resolver: zodResolver(CreateBrandSchema),
    defaultValues: {}
  })

  const name = form.watch("name")

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="mb-6 mt-8 flex items-end justify-between">
          <h1 className="text-3xl font-black text-gray-800">
            {name
              ? name
              : t("common:new_entity", { entity: t("common:brand") })}
          </h1>
          <Button
            className="sticky top-0"
            type="submit"
            loading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            {t("common:save_entity", { entity: t("common:brand") })}
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
        </div>
      </form>
    </Form>
  )
}

export default CreateBrand
