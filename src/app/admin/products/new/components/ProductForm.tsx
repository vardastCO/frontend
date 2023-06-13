"use client"

import { Button } from "@core/components/Button"
import Dropzone from "@core/components/Dropzone"
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
        <div className="mb-6 mt-8 flex items-end justify-between">
          <h1 className="text-3xl font-black text-gray-800">
            {productName ? productName : t("common:new_product")}
          </h1>
          <Button className="sticky top-0">
            {t("common:save_entity", { entity: t("common:product") })}
          </Button>
        </div>
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-6">
            <TextField label={t("common:product_name")}>
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
                  label={t("common:product_type")}
                >
                  <div className="grid grid-cols-4 gap-6">
                    <Radio value="physical" className="product-type-item">
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
                    </Radio>
                    <Radio value="digital" className="product-type-item">
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
                    </Radio>
                    <Radio value="bundle" className="product-type-item">
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
                    </Radio>
                    <Radio value="gift_card" className="product-type-item">
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
