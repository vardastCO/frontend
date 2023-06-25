"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import { useCreateBrandMutation } from "@/generated"

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
import Card from "@core/components/shared/Card"
import { Button } from "@core/components/ui/button"
import { Input } from "@core/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@core/components/ui/select"
import { Textarea } from "@core/components/ui/textarea"
import { useToast } from "@core/hooks/use-toast"
import { socialNetworks } from "@core/lib/socialNetworks"

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

  z.setErrorMap(zodI18nMap)
  const CreateBrandSchema = z.object({
    name: z.string(),
    slug: slugInputSchema,
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    website: z.string().optional(),
    about: z.string().optional(),
    social: z.string().optional()
  })
  type CreateBrandType = TypeOf<typeof CreateBrandSchema>

  const form = useForm<CreateBrandType>({
    resolver: zodResolver(CreateBrandSchema),
    defaultValues: {}
  })

  const name = form.watch("name")

  function onSubmit(data: CreateBrandType) {
    const { name, slug, email, phone, address, website, about } = data

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
        <div className="flex flex-col gap-8">
          <Card template="1/2" title={t("common:title")}>
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
            </div>
          </Card>

          <Card template="1/2" title={t("common:contact_information")}>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>{t("common:address")}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:phone")}</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:email")}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>{t("common:website")}</FormLabel>
                    <FormControl dir="ltr" prefixAddon="http://">
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <Card template="1/2" title={t("common:about")}>
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:about")}</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <Card template="1/2" title={t("common:social_networks")}>
            <div className="grid grid-cols-[1fr_2fr] gap-6">
              <FormField
                control={form.control}
                name="social"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:social_network")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
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
                        {socialNetworks.map((item, idx) => (
                          <SelectItem value={item.name} key={idx}>
                            {item.name}
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:address")}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        </div>
      </form>
    </Form>
  )
}

export default CreateBrand
