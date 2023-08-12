"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ClientError } from "graphql-request"
import {
  LucideAlertOctagon,
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
  ThreeStateSupervisionStatuses,
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
import { Alert, AlertDescription, AlertTitle } from "@core/components/ui/alert"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@core/components/ui/select"
import { Switch } from "@core/components/ui/switch"
import { Textarea } from "@core/components/ui/textarea"
import { toast } from "@core/hooks/use-toast"
import { uploadPaths } from "@core/lib/uploadPaths"
import AttributeSection from "@/app/admin/products/components/AttributeSection"
import CreateAttributeModal from "@/app/admin/products/components/CreateAttributeModal"
import CreatePriceModal from "@/app/admin/products/components/CreatePriceModal"
import PriceSection from "@/app/admin/products/components/PriceSection"

type ProductFormProps = {
  product?: Product
}

const ProductForm = ({ product }: ProductFormProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [images, setImages] = useState<
    { uuid: string; expiresAt: string; image?: Image }[]
  >([])
  const [errors, setErrors] = useState<ClientError>()
  const [createPriceModalOpen, setCreatePriceModalOpen] =
    useState<boolean>(false)
  const [createAttributeModalOpen, setCreateAttributeModalOpen] =
    useState<boolean>(false)

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
  const statuses = enumToKeyValueObject(ThreeStateSupervisionStatuses)

  z.setErrorMap(zodI18nMap)
  const CreateProductSchema = z.object({
    name: z.string(),
    slug: slugInputSchema,
    sku: z.string(),
    type: z.nativeEnum(ProductTypesEnum),
    status: z.nativeEnum(ThreeStateSupervisionStatuses),
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
      status: product?.status,
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
    const {
      name,
      slug,
      status,
      sku,
      type,
      categoryId,
      brandId,
      uomId,
      isActive
    } = data

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
          uomId,
          status,
          isActive
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
          uomId,
          status,
          isActive
        }
      })
    }
  }

  return (
    <>
      {product && (
        <CreatePriceModal
          open={createPriceModalOpen}
          onOpenChange={setCreatePriceModalOpen}
          productId={product.id}
        />
      )}
      {product && (
        <CreateAttributeModal
          open={createAttributeModalOpen}
          onOpenChange={setCreateAttributeModalOpen}
          productId={product.id}
          categoryId={product.category.id}
        />
      )}
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
                          className="grid w-full grid-cols-1 lg:grid-cols-4 lg:gap-6"
                        >
                          <FormItem className="product-type-item relative">
                            <FormControl className="invisible absolute inset-0 h-full w-full">
                              <RadioGroupItem
                                value={ProductTypesEnum.Physical}
                              />
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
                              <RadioGroupItem
                                disabled={true}
                                value={ProductTypesEnum.Digital}
                              />
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
                              <RadioGroupItem
                                disabled={true}
                                value={ProductTypesEnum.Bundle}
                              />
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
                              <RadioGroupItem
                                disabled={true}
                                value={ProductTypesEnum.Gift}
                              />
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
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("common:status")}</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          form.setValue(
                            "status",
                            value as ThreeStateSupervisionStatuses
                          )
                        }}
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
                          {Object.keys(statuses).map((type) => (
                            <SelectItem value={statuses[type]} key={type}>
                              {type}
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

              {product && (
                <PriceSection
                  prices={product.prices}
                  onOpenCreateModal={() => setCreatePriceModalOpen(true)}
                />
              )}

              {product && (
                <AttributeSection
                  attributes={product.attributeValues}
                  onOpenCreateModal={() => setCreateAttributeModalOpen(true)}
                />
              )}

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
    </>
  )
}

export default ProductForm
