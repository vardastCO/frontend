"use client"

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

import { useGetVocabularyQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { mergeClasses } from "@core/utils/mergeClasses"
import { slugInputSchema } from "@core/utils/zodValidationSchemas"
import Dropzone from "@core/components/Dropzone"
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

const ProductForm = () => {
  const { t } = useTranslation()
  const CreateProductSchema = z.object({
    productName: z.string(),
    productType: z.string(),
    isActive: z.boolean(),
    categoryId: z.number(),
    pageTitle: z.string(),
    metaDescription: z.string(),
    slug: slugInputSchema
  })
  type CreateProductType = TypeOf<typeof CreateProductSchema>
  const { data } = useGetVocabularyQuery(graphqlRequestClient, {
    slug: "product_categories"
  })

  const form = useForm<CreateProductType>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      productType: "physical",
      isActive: true
    }
  })

  const productName = form.watch("productName")

  const onSubmit = () => {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="create-product">
          <div className="mb-6 mt-8 flex items-end justify-between">
            <h1 className="text-3xl font-black text-gray-800">
              {productName ? productName : t("common:new_product")}
            </h1>
            <Button type="submit" className="sticky top-0">
              {t("common:save_entity", { entity: t("common:product") })}
            </Button>
          </div>
          <div className="flex flex-col gap-24">
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="productName"
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
                name="productType"
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
              {/* TODO: Categories */}
              <FormField
                control={form.control}
                name="categoryId"
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
                                    category && category.id === field.value
                                )?.title
                              : t("common:choose_entity", {
                                  entity: t("common:category")
                                })}
                            <IconSelector className="ms-auto h-4 w-4 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
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
                          <CommandGroup className="max-h-[150px] overflow-auto">
                            {data?.vocabulary.categories.map(
                              (category) =>
                                category && (
                                  <CommandItem
                                    value={category.title}
                                    key={category.id}
                                    onSelect={(value) => {
                                      form.setValue("categoryId", +value)
                                    }}
                                  >
                                    <IconCheck
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
              {/* TODO: images */}
              <Dropzone />
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
