"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  IconCheck,
  IconGift,
  IconPackage,
  IconPackages,
  IconSelector,
  IconWorld
} from "@tabler/icons-react"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import {
  ProductTypesEnum,
  useCreateProductMutation,
  useGetVocabularyQuery
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { mergeClasses } from "@core/utils/mergeClasses"
import zodI18nMap from "@core/utils/zodErrorMap"
import { slugInputSchema } from "@core/utils/zodValidationSchemas"
import Dropzone, { FilesWithPreview } from "@core/components/Dropzone"
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
import { RadioGroup, RadioGroupItem } from "@core/components/ui/radio-group"
import { Switch } from "@core/components/ui/switch"
import { uploadPaths } from "@core/lib/uploadPaths"

const ProductForm = () => {
  const { t } = useTranslation()
  const [images, setImages] = useState<FilesWithPreview[]>([])

  const createProductMutation = useCreateProductMutation(graphqlRequestClient)

  z.setErrorMap(zodI18nMap)
  const CreateProductSchema = z.object({
    name: z.string(),
    slug: slugInputSchema,
    sku: z.string(),
    type: z.string(),
    isActive: z.boolean(),
    category: z.string(),
    categoryId: z.number(),
    brandId: z.number(),
    uomId: z.number(),
    pageTitle: z.string(),
    metaDescription: z.string()
  })
  type CreateProductType = TypeOf<typeof CreateProductSchema>
  const { data } = useGetVocabularyQuery(graphqlRequestClient, {
    slug: "product_categories"
  })

  const form = useForm<CreateProductType>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      type: "physical",
      isActive: true
    }
  })

  const name = form.watch("name")

  const onSubmit = (data: CreateProductType) => {
    const { name, slug, sku, type, categoryId, brandId, uomId, isActive } = data

    createProductMutation.mutate({
      createProductInput: {
        name,
        type: ProductTypesEnum.Physical,
        slug,
        sku,
        categoryId,
        brandId,
        uomId
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="create-product">
          <div className="mb-6 mt-8 flex items-end justify-between">
            <h1 className="text-3xl font-black text-gray-800">
              {name ? name : t("common:new_product")}
            </h1>
            <Button type="submit" className="sticky top-0">
              {t("common:save_entity", { entity: t("common:product") })}
            </Button>
          </div>
          <div className="flex flex-col gap-24">
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:product_name")}</FormLabel>
                    <FormControl size="large">
                      <Input
                        {...field}
                        placeholder={t("common:enter_product_name")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:product_sku")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("common:enter_product_sku")}
                      />
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
                    <FormLabel>{t("common:product_type")}</FormLabel>
                    <FormControl>
                      <RadioGroup className="grid grid-cols-4 gap-6">
                        <FormItem className="product-type-item relative">
                          <FormControl className="invisible absolute inset-0 h-full w-full">
                            <RadioGroupItem value="physical" />
                          </FormControl>
                          <FormLabel
                            noStyle
                            className="product-type-item-wrapper"
                          >
                            <div className="product-type-item-label">
                              <IconPackage
                                className="product-type-item-icon"
                                stroke={1.5}
                              />
                              <span className="product-type-item-title">
                                {t("common:physical")}
                              </span>
                            </div>
                            <span className="product-type-item-description">
                              {t("common:physical_product_type_description")}
                            </span>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="product-type-item relative">
                          <FormControl className="invisible absolute inset-0 h-full w-full">
                            <RadioGroupItem value="digital" />
                          </FormControl>
                          <FormLabel
                            noStyle
                            className="product-type-item-wrapper"
                          >
                            <div className="product-type-item-label">
                              <IconWorld
                                className="product-type-item-icon"
                                stroke={1.5}
                              />
                              <span className="product-type-item-title">
                                {t("common:digital")}
                              </span>
                            </div>
                            <span className="product-type-item-description">
                              {t("common:digital_product_type_description")}
                            </span>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="product-type-item relative">
                          <FormControl className="invisible absolute inset-0 h-full w-full">
                            <RadioGroupItem value="bundle" />
                          </FormControl>
                          <FormLabel
                            noStyle
                            className="product-type-item-wrapper"
                          >
                            <div className="product-type-item-label">
                              <IconPackages
                                className="product-type-item-icon"
                                stroke={1.5}
                              />
                              <span className="product-type-item-title">
                                {t("common:bundle")}
                              </span>
                            </div>
                            <span className="product-type-item-description">
                              {t("common:bundle_product_type_description")}
                            </span>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="product-type-item relative">
                          <FormControl className="invisible absolute inset-0 h-full w-full">
                            <RadioGroupItem value="gift-card" />
                          </FormControl>
                          <FormLabel
                            noStyle
                            className="product-type-item-wrapper"
                          >
                            <div className="product-type-item-label">
                              <IconGift
                                className="product-type-item-icon"
                                stroke={1.5}
                              />
                              <span className="product-type-item-title">
                                {t("common:gift_card")}
                              </span>
                            </div>
                            <span className="product-type-item-description">
                              {t("common:gift_card_product_type_description")}
                            </span>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
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

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:category")}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            noStyle
                            role="combobox"
                            className="input-field flex items-center text-start"
                          >
                            {field.value
                              ? data?.vocabulary.categories.find(
                                  (category) =>
                                    category &&
                                    category.title.toLowerCase() === field.value
                                )?.title
                              : t("common:choose_entity", {
                                  entity: t("common:category")
                                })}
                            <IconSelector className="ms-auto h-4 w-4 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent>
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
                            {data?.vocabulary.categories.map(
                              (category) =>
                                category && (
                                  <CommandItem
                                    value={category.title}
                                    key={category.id}
                                    onSelect={(value) => {
                                      form.setValue("category", value)
                                      form.setValue(
                                        "categoryId",
                                        data?.vocabulary.categories.find(
                                          (item) =>
                                            item &&
                                            item.title.toLowerCase() === value
                                        )?.id || 0
                                      )
                                    }}
                                  >
                                    <IconCheck
                                      className={mergeClasses(
                                        "mr-2 h-4 w-4",
                                        category.title.toLowerCase() ===
                                          field.value
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

              <Dropzone
                uploadPath={uploadPaths.productImages}
                onAddition={(file) => {
                  setImages((prevImages) => [...prevImages, file])
                }}
                onDelete={(file) => {
                  setImages((images) =>
                    images.filter((image) => image.name !== file.name)
                  )
                }}
              />
            </div>
            <div>
              <h2 className="section-title">
                {t("common:create_product_pricing_section_title")}
              </h2>
              <p className="section-description">
                {t("common:create_product_pricing_section_description")}
              </p>
            </div>
            <div>
              <h2 className="section-title">
                {t("common:create_product_content_section_title")}
              </h2>
              <p className="section-description">
                {t("common:create_product_content_section_description")}
              </p>
              <div className="section-body">
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="pageTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("common:page_title")}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("common:meta_description")}</FormLabel>
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
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default ProductForm
