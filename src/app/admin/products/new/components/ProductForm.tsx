"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  IconGift,
  IconPackage,
  IconPackages,
  IconWorld
} from "@tabler/icons-react"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

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
import { Input } from "@core/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@core/components/ui/radio-group"
import { Switch } from "@core/components/ui/switch"

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
                      <Input {...field} />
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
                        <FormItem className="relative product-type-item">
                          <FormControl className="absolute invisible">
                            <RadioGroupItem value="physical" />
                          </FormControl>
                          <FormLabel noStyle>
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
                        <FormItem className="relative product-type-item">
                          <FormControl className="absolute invisible">
                            <RadioGroupItem value="digital" />
                          </FormControl>
                          <FormLabel noStyle>
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
                        <FormItem className="relative product-type-item">
                          <FormControl className="absolute invisible">
                            <RadioGroupItem value="bundle" />
                          </FormControl>
                          <FormLabel noStyle>
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
                        <FormItem className="relative product-type-item">
                          <FormControl className="absolute invisible">
                            <RadioGroupItem value="gift-card" />
                          </FormControl>
                          <FormLabel noStyle>
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
                    <div className="flex gap-1 items-center">
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
