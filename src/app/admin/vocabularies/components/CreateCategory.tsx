"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
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
  useCreateCategoryMutation,
  useGetAllCategoriesQuery
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { mergeClasses } from "@core/utils/mergeClasses"
import { slugify } from "@core/utils/slugify"
import zodI18nMap from "@core/utils/zodErrorMap"
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
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@core/components/ui/popover"
import { toast } from "@core/hooks/use-toast"

type Props = {
  vocabularyId: number
}

const CreateCategory = ({ vocabularyId }: Props) => {
  const { t } = useTranslation()
  const [parentCategoryOpen, setParentCategoryOpen] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [errors, setErrors] = useState<ClientError>()

  const queryClient = useQueryClient()

  const categories = useGetAllCategoriesQuery(graphqlRequestClient, {
    indexCategoryInput: {
      vocabularyId: vocabularyId
    }
  })

  const createCategoryMutation = useCreateCategoryMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        form.reset()
        queryClient.invalidateQueries({ queryKey: ["GetVocabulary"] })
        setOpen(false)
        toast({
          description: t("common:entity_added_successfully", {
            entity: t("common:category")
          }),
          duration: 2000,
          variant: "success"
        })
      },
      onError: (errors: ClientError) => {
        setErrors(errors)
      }
    }
  )

  z.setErrorMap(zodI18nMap)
  const CreateCategorySchema = z.object({
    parentCategoryId: z.number().optional(),
    title: z.string(),
    titleEn: z.string(),
    slug: z.string(),
    sort: z.number().optional().default(0),
    isActive: z.boolean().optional().default(true)
  })
  type CreateCategory = TypeOf<typeof CreateCategorySchema>

  const form = useForm<CreateCategory>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      sort: 0,
      isActive: true
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

  const onClose = () => {
    form.reset()
    setOpen(false)
  }

  function onSubmit(data: CreateCategory) {
    const { title, titleEn, slug, sort, parentCategoryId } = data

    createCategoryMutation.mutate({
      createCategoryInput: {
        vocabularyId,
        parentCategoryId,
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
        {t("common:add_entity", { entity: t("common:category") })}
      </Button>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("common:create_new_entity", {
                entity: t("common:category")
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
                  name="parentCategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("common:parent_category")}</FormLabel>
                      <Popover
                        open={parentCategoryOpen}
                        onOpenChange={setParentCategoryOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={
                                categories.isLoading || categories.isError
                              }
                              noStyle
                              role="combobox"
                              className="input-field flex items-center text-start"
                            >
                              {field.value
                                ? categories.data?.categories.find(
                                    (category) =>
                                      category && category.id === field.value
                                  )?.title
                                : t("common:choose_entity", {
                                    entity: t("common:category")
                                  })}
                              <LucideChevronsUpDown className="ms-auto h-4 w-4 shrink-0" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="z-[9999]">
                          <Command>
                            <CommandInput
                              placeholder={t("common:search_entity", {
                                entity: t("common:category")
                              })}
                            />
                            <CommandEmpty>
                              {t("common:no_entity_found", {
                                entity: t("common:category")
                              })}
                            </CommandEmpty>
                            <CommandGroup>
                              {categories.data?.categories.map(
                                (category) =>
                                  category && (
                                    <CommandItem
                                      value={category.title}
                                      key={category.id}
                                      onSelect={(value) => {
                                        form.setValue(
                                          "parentCategoryId",
                                          categories.data?.categories.find(
                                            (item) =>
                                              item &&
                                              item.title.toLowerCase() === value
                                          )?.id || 0
                                        )
                                        setParentCategoryOpen(false)
                                      }}
                                    >
                                      <LucideCheck
                                        className={mergeClasses(
                                          "mr-2 h-4 w-4",
                                          category.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {category.title}
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
              </div>
              <DialogFooter>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => onClose()}
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
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateCategory
