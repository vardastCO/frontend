"use client"

import { Input } from "@core/components/Input"
import { Radio, RadioGroup } from "@core/components/RadioGroup"
import { Switch } from "@core/components/Switch"
import { TextField } from "@core/components/TextField"
import { Textarea } from "@core/components/Textarea"
import { slugInputSchema } from "@core/utils/zodValidationSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  IconGift,
  IconPackage,
  IconPackages,
  IconPhotoPlus,
  IconWorld
} from "@tabler/icons-react"
import useTranslation from "next-translate/useTranslation"
import { Controller, useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

const ProductForm = () => {
  const { t } = useTranslation()
  const CreateProductSchema = z.object({
    productName: z.string(),
    productType: z.string(),
    isActive: z.boolean(),
    pageTitle: z.string(),
    metaDescription: z.string(),
    slug: slugInputSchema
  })
  type CreateProductType = TypeOf<typeof CreateProductSchema>

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateProductType>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      productType: "physical",
      isActive: true
    }
  })

  const productName = watch("productName")

  return (
    <>
      <div className="create-product">
        <div className="mb-6 mt-8">
          <h1 className="text-3xl font-black text-gray-800">
            {productName ? productName : t("product:new_product")}
          </h1>
        </div>
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-6">
            <TextField label={t("product:product_name")}>
              <Input inputSize="large" {...register("productName")} />
            </TextField>
            <Controller
              name="productType"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  defaultValue={field.value}
                  onChange={field.onChange}
                  name={field.name}
                  label={t("product:product_type")}
                >
                  <div className="grid grid-cols-4 gap-6">
                    <Radio value="physical" className="product-type-item">
                      <div className="product-type-item-label">
                        <IconPackage
                          className="product-type-item-icon"
                          stroke={1.5}
                        />
                        <span className="product-type-item-title">
                          {t("product:physical")}
                        </span>
                      </div>
                      <span className="product-type-item-description">
                        {t("product:physical_product_type_description")}
                      </span>
                    </Radio>
                    <Radio value="digital" className="product-type-item">
                      <div className="product-type-item-label">
                        <IconWorld
                          className="product-type-item-icon"
                          stroke={1.5}
                        />
                        <span className="product-type-item-title">
                          {t("product:digital")}
                        </span>
                      </div>
                      <span className="product-type-item-description">
                        {t("product:digital_product_type_description")}
                      </span>
                    </Radio>
                    <Radio value="bundle" className="product-type-item">
                      <div className="product-type-item-label">
                        <IconPackages
                          className="product-type-item-icon"
                          stroke={1.5}
                        />
                        <span className="product-type-item-title">
                          {t("product:bundle")}
                        </span>
                      </div>
                      <span className="product-type-item-description">
                        {t("product:bundle_product_type_description")}
                      </span>
                    </Radio>
                    <Radio value="gift_card" className="product-type-item">
                      <div className="product-type-item-label">
                        <IconGift
                          className="product-type-item-icon"
                          stroke={1.5}
                        />
                        <span className="product-type-item-title">
                          {t("product:gift_card")}
                        </span>
                      </div>
                      <span className="product-type-item-description">
                        {t("product:gift_card_product_type_description")}
                      </span>
                    </Radio>
                  </div>
                </RadioGroup>
              )}
            />
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Switch
                  isSelected={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  {t("common:is_active")}
                </Switch>
              )}
            />
            {/* TODO: Categories */}
            {/* TODO: images */}
            <div className="card h-60 rounded p-4">
              <div className="flex h-full w-full flex-col items-center justify-center gap-1">
                <IconPhotoPlus className="h-12 w-12 text-gray-400" />
                <span className="font-medium text-gray-800">
                  {t("common:add_images_dropzone_title")}
                </span>
                <span className="text-sm text-gray-500">
                  {t("common:add_images_dropzone_description")}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="section-title">
              {t("product:create_product_pricing_section_title")}
            </h2>
            <p className="section-description">
              {t("product:create_product_pricing_section_description")}
            </p>
          </div>
          <div>
            <h2 className="section-title">
              {t("product:create_product_content_section_title")}
            </h2>
            <p className="section-description">
              {t("product:create_product_content_section_description")}
            </p>
            <div className="section-body">
              <div className="flex flex-col gap-6">
                <TextField label={t("common:page_title")}>
                  <Input {...register("pageTitle")} />
                </TextField>
                <TextField label={t("common:meta_description")}>
                  <Textarea {...register("metaDescription")} />
                </TextField>
                <TextField label={t("common:slug")}>
                  <Input
                    {...register("slug")}
                    dir="ltr"
                    direction="ltr"
                    prefixAddon="https://"
                  />
                </TextField>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductForm
