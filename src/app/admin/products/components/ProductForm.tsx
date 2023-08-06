"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"
import { formatDistanceToNow, setDefaultOptions } from "date-fns"
import { faIR } from "date-fns/locale"
import { ClientError } from "graphql-request"
import {
  LucideBoxes,
  LucideCheck,
  LucideChevronsUpDown,
  LucideGift,
  LucideGlobe,
  LucidePackage
} from "lucide-react"
import useTranslation from "next-translate/useTranslation"
import { useFieldArray, useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import {
  AttributeValue,
  Image,
  Product,
  ProductTypesEnum,
  UpdateAttributeValueInputSchema,
  useCreateImageMutation,
  useCreateProductMutation,
  useGetAllBrandsWithoutPaginationQuery,
  useGetAllCategoriesQuery,
  useGetAllUomsWithoutPaginationQuery,
  useGetVocabularyQuery,
  useUpdateProductMutation
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { enumToKeyValueObject } from "@core/utils/enumToKeyValueObject"
import { mergeClasses } from "@core/utils/mergeClasses"
import zodI18nMap from "@core/utils/zodErrorMap"
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
import { Textarea } from "@core/components/ui/textarea"
import { toast } from "@core/hooks/use-toast"
import { uploadPaths } from "@core/lib/uploadPaths"

type ProductFormProps = {
  product?: Product
}

setDefaultOptions({
  locale: faIR,
  weekStartsOn: 6
})

const ProductForm = ({ product }: ProductFormProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [images, setImages] = useState<
    { uuid: string; expiresAt: string; image?: Image }[]
  >([])
  const [errors, setErrors] = useState<ClientError>()

  const createImageMutation = useCreateImageMutation(graphqlRequestClient)
  const createProductMutation = useCreateProductMutation(graphqlRequestClient, {
    onError: (errors: ClientError) => {
      setErrors(errors)
    },
    onSuccess: async (data) => {
      Promise.all(
        images.map(async (image, idx) => {
          await createImageMutation.mutateAsync({
            createImageInput: {
              productId: data.createProduct.id,
              fileUuid: image.uuid,
              sort: idx,
              isPublic: true
            }
          })
        })
      )
      toast({
        description: t("common:entity_added_successfully", {
          entity: t("common:product")
        }),
        duration: 2000,
        variant: "success"
      })
      router.push("/admin/products")
    }
  })
  const updateProductMutation = useUpdateProductMutation(graphqlRequestClient, {
    onError: (errors: ClientError) => {
      setErrors(errors)
    },
    onSuccess: async (data) => {
      Promise.all(
        images.map(async (image, idx) => {
          await createImageMutation.mutateAsync({
            createImageInput: {
              productId: data.updateProduct.id,
              fileUuid: image.uuid,
              sort: idx,
              isPublic: true
            }
          })
        })
      )
      toast({
        description: t("common:entity_updated_successfully", {
          entity: t("common:product")
        }),
        duration: 2000,
        variant: "success"
      })
      router.push("/admin/products")
    }
  })

  const types = enumToKeyValueObject(ProductTypesEnum)

  z.setErrorMap(zodI18nMap)
  const CreateProductSchema = z.object({
    name: z.string(),
    slug: slugInputSchema,
    sku: z.string(),
    type: z.nativeEnum(ProductTypesEnum),
    isActive: z.boolean(),
    categoryId: z.number(),
    brandId: z.number(),
    uomId: z.number(),
    title: z.string().optional(),
    description: z.string().optional(),
    metaDescription: z.string().optional(),
    attributes: z.array(UpdateAttributeValueInputSchema()).nullish()
  })
  type CreateProductType = TypeOf<typeof CreateProductSchema>

  const form = useForm<CreateProductType>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: product?.name,
      sku: product?.sku,
      type: product?.type,
      slug: product?.slug,
      title: product?.title || "",
      description: product?.description || "",
      metaDescription: product?.metaDescription || "",
      categoryId: product?.category.id,
      brandId: product?.brand.id,
      uomId: product?.uom.id,
      isActive: product?.isActive,
      attributes: product?.attributeValues as AttributeValue[]
    }
  })

  const name = form.watch("name")

  const productsVocabulary = useGetVocabularyQuery(graphqlRequestClient, {
    slug: "product_categories"
  })
  const categories = useGetAllCategoriesQuery(graphqlRequestClient, {
    indexCategoryInput: {
      vocabularyId: productsVocabulary.data?.vocabulary.id
    }
  })
  const brands = useGetAllBrandsWithoutPaginationQuery(graphqlRequestClient)
  const uoms = useGetAllUomsWithoutPaginationQuery(graphqlRequestClient)

  const attributes = useFieldArray({
    name: "attributes",
    control: form.control
  })

  const onSubmit = (data: CreateProductType) => {
    const { name, slug, sku, type, categoryId, brandId, uomId, isActive } = data

    if (product) {
      updateProductMutation.mutate({
        updateProductInput: {
          id: product.id,
          name,
          type,
          slug,
          sku,
          categoryId,
          brandId,
          uomId
        }
      })
    } else {
      createProductMutation.mutate({
        createProductInput: {
          name,
          type,
          slug,
          sku,
          categoryId,
          brandId,
          uomId
        }
      })
    }
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
                name="uomId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:uom")}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={uoms.isLoading || uoms.isError}
                            noStyle
                            role="combobox"
                            className="input-field flex items-center text-start"
                          >
                            {field.value
                              ? uoms.data?.uomsWithoutPagination.find(
                                  (uom) => uom && uom.id === field.value
                                )?.name
                              : t("common:choose_entity", {
                                  entity: t("common:uom")
                                })}
                            <LucideChevronsUpDown className="ms-auto h-4 w-4 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Command>
                          <CommandInput
                            placeholder={t("common:search_entity", {
                              entity: t("common:uom")
                            })}
                          />
                          <CommandEmpty>
                            {t("common:no_entity_found", {
                              entity: t("common:uom")
                            })}
                          </CommandEmpty>
                          <CommandGroup>
                            {uoms.data?.uomsWithoutPagination.map(
                              (uom) =>
                                uom && (
                                  <CommandItem
                                    value={uom.name}
                                    key={uom.id}
                                    onSelect={(value) => {
                                      form.setValue(
                                        "uomId",
                                        uoms.data?.uomsWithoutPagination.find(
                                          (item) =>
                                            item &&
                                            item.name.toLowerCase() === value
                                        )?.id || 0
                                      )
                                    }}
                                  >
                                    <LucideCheck
                                      className={mergeClasses(
                                        "mr-2 h-4 w-4",
                                        uom.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {uom.name}
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:product_type")}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        defaultValue={field.value}
                        className="grid grid-cols-4 gap-6"
                      >
                        <FormItem className="product-type-item relative">
                          <FormControl className="invisible absolute inset-0 h-full w-full">
                            <RadioGroupItem value={ProductTypesEnum.Physical} />
                          </FormControl>
                          <FormLabel
                            noStyle
                            className="product-type-item-wrapper"
                          >
                            <div className="product-type-item-label">
                              <LucidePackage
                                className="product-type-item-icon"
                                strokeWidth={1.5}
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
                            <RadioGroupItem value={ProductTypesEnum.Digital} />
                          </FormControl>
                          <FormLabel
                            noStyle
                            className="product-type-item-wrapper"
                          >
                            <div className="product-type-item-label">
                              <LucideGlobe
                                className="product-type-item-icon"
                                strokeWidth={1.5}
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
                            <RadioGroupItem value={ProductTypesEnum.Bundle} />
                          </FormControl>
                          <FormLabel
                            noStyle
                            className="product-type-item-wrapper"
                          >
                            <div className="product-type-item-label">
                              <LucideBoxes
                                className="product-type-item-icon"
                                strokeWidth={1.5}
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
                            <RadioGroupItem value={ProductTypesEnum.Gift} />
                          </FormControl>
                          <FormLabel
                            noStyle
                            className="product-type-item-wrapper"
                          >
                            <div className="product-type-item-label">
                              <LucideGift
                                className="product-type-item-icon"
                                strokeWidth={1.5}
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
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:category")}</FormLabel>
                    <Popover>
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
                            {categories.data?.categories.map(
                              (category) =>
                                category && (
                                  <CommandItem
                                    value={category.title}
                                    key={category.id}
                                    onSelect={(value) => {
                                      form.setValue(
                                        "categoryId",
                                        categories.data?.categories.find(
                                          (item) =>
                                            item &&
                                            item.title.toLowerCase() === value
                                        )?.id || 0
                                      )
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
                name="brandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:brand")}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={brands.isLoading || brands.isError}
                            noStyle
                            role="combobox"
                            className="input-field flex items-center text-start"
                          >
                            {field.value
                              ? brands.data?.brandsWithoutPagination.find(
                                  (brand) => brand && brand.id === field.value
                                )?.name
                              : t("common:choose_entity", {
                                  entity: t("common:brand")
                                })}
                            <LucideChevronsUpDown className="ms-auto h-4 w-4 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Command>
                          <CommandInput
                            placeholder={t("common:search_entity", {
                              entity: t("common:brand")
                            })}
                          />
                          <CommandEmpty>
                            {t("common:no_entity_found", {
                              entity: t("common:brand")
                            })}
                          </CommandEmpty>
                          <CommandGroup>
                            {brands.data?.brandsWithoutPagination.map(
                              (brand) =>
                                brand && (
                                  <CommandItem
                                    value={brand.name}
                                    key={brand.id}
                                    onSelect={(value) => {
                                      form.setValue(
                                        "brandId",
                                        brands.data?.brandsWithoutPagination.find(
                                          (item) =>
                                            item &&
                                            item.name.toLowerCase() === value
                                        )?.id || 0
                                      )
                                    }}
                                  >
                                    <LucideCheck
                                      className={mergeClasses(
                                        "mr-2 h-4 w-4",
                                        brand.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {brand.name}
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
                existingImages={product && product.images}
                uploadPath={uploadPaths.productImages}
                onAddition={(file) => {
                  setImages((prevImages) => [
                    ...prevImages,
                    {
                      uuid: file.uuid as string,
                      expiresAt: file.expiresAt as string
                    }
                  ])
                }}
                onDelete={(file) => {
                  setImages((images) =>
                    images.filter((image) => image.uuid !== file.uuid)
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

              <div className="section-body">
                <div className="card table-responsive rounded">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>{t("common:price")}</th>
                        <th>{t("common:submitted_date")}</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {product?.prices.map(
                        (price) =>
                          price && (
                            <tr key={price.id}>
                              <td>
                                {digitsEnToFa(addCommas(price.amount))}{" "}
                                {t("common:toman")}
                              </td>
                              <td>
                                {digitsEnToFa(
                                  formatDistanceToNow(
                                    new Date(price.createdAt).getTime(),
                                    {
                                      addSuffix: true
                                    }
                                  )
                                )}
                              </td>
                              <td>
                                {price.isPublic ? (
                                  <span className="tag tag-sm tag-light tag-success">
                                    {t("common:public")}
                                  </span>
                                ) : (
                                  <span className="tag tag-sm tag-light tag-gray">
                                    {t("common:private")}
                                  </span>
                                )}
                              </td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button variant="secondary">
                    {t("common:add_entity", { entity: t("common:price") })}
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="section-title">
                {t("common:create_product_attributes_section_title")}
              </h2>
              <p className="section-description">
                {t("common:create_product_attributes_section_description")}
              </p>
              <div className="section-body">
                <div className="card table-responsive rounded">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>{t("common:attribute")}</th>
                        <th>{t("common:value")}</th>
                        <th>{t("common:product_sku")}</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {product?.attributeValues.map(
                        (attribute) =>
                          attribute && (
                            <tr key={attribute.id}>
                              <td>{attribute.attribute.name}</td>
                              <td>
                                {attribute.value}{" "}
                                {attribute.attribute.uom?.name}
                              </td>
                              <td>{attribute.sku}</td>
                              <td>
                                <Button size="small" variant="secondary">
                                  {t("common:edit")}
                                </Button>
                              </td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button variant="secondary">
                    {t("common:add_entity", { entity: t("common:attribute") })}
                  </Button>
                </div>
              </div>
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
                    name="title"
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("common:description")}</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
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
