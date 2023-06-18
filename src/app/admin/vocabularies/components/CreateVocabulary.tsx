"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"
import { useCreateVocabularyMutation } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { slugify } from "@core/utils/slugify"
import zodI18nMap from "@core/utils/zodErrorMap"
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
import { useToast } from "@core/hooks/use-toast"

type Props = {}

const CreateVocavulary = (props: Props) => {
  const { t } = useTranslation()
  const { toast } = useToast()

  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()
  const createVocabularyMutation = useCreateVocabularyMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        form.reset()
        queryClient.invalidateQueries({ queryKey: ["GetAllVocabularies"] })
        setOpen(false)
        toast({
          description: t("common:entity_added_successfully", {
            entity: t("common:vocabulary")
          }),
          duration: 2000,
          variant: "success"
        })
      }
    }
  )

  z.setErrorMap(zodI18nMap)
  const CreateVocabularySchema = z.object({
    title: persianInputSchema,
    titleEn: englishInputSchema,
    slug: slugInputSchema,
    sort: z.number().optional().default(0)
  })
  type CreateVocavulary = TypeOf<typeof CreateVocabularySchema>

  const form = useForm<CreateVocavulary>({
    resolver: zodResolver(CreateVocabularySchema),
    defaultValues: {
      sort: 0
    }
  })

  const titleEn = form.watch("titleEn")

  useEffect(() => {
    if (titleEn) {
      form.setValue("slug", slugify(titleEn))
    } else {
      form.setValue("slug", "")
    }
  }, [titleEn, form])

  function onSubmit(data: CreateVocavulary) {
    const { title, titleEn, slug, sort } = data

    createVocabularyMutation.mutate({
      createVocabularyInput: {
        title,
        titleEn,
        slug,
        sort
      }
    })
  }

  return (
    <>
      <Button size="medium" onClick={() => setOpen(true)}>
        {t("common:add_entity", { entity: t("common:vocabulary") })}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("common:create_new_entity", {
                entity: t("common:vocabulary")
              })}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
              noValidate
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:title")}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="titleEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:english_title")}</FormLabel>
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
            </form>
          </Form>
          <DialogFooter>
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
                loading={form.formState.isSubmitting}
                disabled={form.formState.isSubmitting}
              >
                {t("common:cancel")}
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {t("common:submit")}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateVocavulary
