"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import { useCreateCountryMutation } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { slugify } from "@core/utils/slugify"
import {
  englishInputSchema,
  persianInputSchema,
  slugInputSchema
} from "@core/utils/zodValidationSchemas"
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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@core/components/ui/dialog"
import { Input } from "@core/components/ui/input"
import { Switch } from "@core/components/ui/switch"
import { useToast } from "@core/hooks/use-toast"

type Props = {}

const CreateCountry = (props: Props) => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()
  const createCountryMutation = useCreateCountryMutation(graphqlRequestClient, {
    onSuccess: () => {
      form.reset()
      queryClient.invalidateQueries({ queryKey: ["GetAllCountries"] })
      setOpen(false)
      toast({
        description: t("common:entity_added_successfully", {
          entity: t("common:country")
        }),
        duration: 2000,
        variant: "success"
      })
    }
  })

  const CreateCountrySchema = z.object({
    name: persianInputSchema,
    nameEn: englishInputSchema,
    slug: slugInputSchema,
    alphaTwo: z.string().length(2),
    iso: z.string(),
    phonePrefix: z.string(),
    sort: z.number().optional().default(0),
    isActive: z.boolean().optional().default(true)
  })
  type CreateCountry = TypeOf<typeof CreateCountrySchema>

  const form = useForm<CreateCountry>({
    resolver: zodResolver(CreateCountrySchema),
    defaultValues: {
      sort: 0,
      isActive: true
    }
  })

  const nameEn = form.watch("nameEn")

  useEffect(() => {
    if (nameEn) {
      form.setValue("slug", slugify(nameEn))
    } else {
      form.setValue("slug", "")
    }
  }, [nameEn, form])

  function onSubmit(data: CreateCountry) {
    const { name, nameEn, alphaTwo, slug, phonePrefix, sort, isActive, iso } =
      data

    createCountryMutation.mutate({
      createCountryInput: {
        name,
        nameEn,
        alphaTwo,
        slug,
        phonePrefix,
        sort,
        isActive,
        iso
      }
    })
  }

  return (
    <>
      <Button size="medium" onClick={() => setOpen(true)}>
        {t("common:add_entity", { entity: t("common:country") })}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {t("common:create_new_entity", {
                    entity: t("common:country")
                  })}
                </DialogTitle>
              </DialogHeader>
              <>
                {createCountryMutation.isError && <p>خطایی رخ داده</p>}
                <div className="flex flex-col gap-6">
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
                    name="nameEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("common:english_name")}</FormLabel>
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
                    name="alphaTwo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("common:alpha_two_name")}</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="iso"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("common:iso_name")}</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phonePrefix"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("common:phone_prefix")}</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sort"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("common:display_sort")}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(event) =>
                              field.onChange(+event.target.value)
                            }
                          />
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
              </>
              <DialogFooter>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    disabled={form.formState.isSubmitting}
                    onClick={() => setOpen(false)}
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
            </DialogContent>
          </form>
        </Form>
      </Dialog>
    </>
  )
}

export default CreateCountry
