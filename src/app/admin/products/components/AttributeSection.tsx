import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import {
  AttributeValue,
  Maybe,
  useCreateAttributeValueMutation
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
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
  DialogHeader,
  DialogTitle
} from "@core/components/ui/dialog"
import { Input } from "@core/components/ui/input"
import { Switch } from "@core/components/ui/switch"

type AttributeSectionProps = {
  productId: number
  attributes: Maybe<AttributeValue>[] | undefined
}

const AttributeSection = ({ productId, attributes }: AttributeSectionProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState<boolean>(false)

  const createAttributeValueMutation =
    useCreateAttributeValueMutation(graphqlRequestClient)

  const CreateAttributeSchema = z.object({
    attributeId: z.number(),
    sku: z.string().optional(),
    value: z.string(),
    isVariant: z.boolean().optional().default(false)
  })
  type CreatePrice = TypeOf<typeof CreateAttributeSchema>

  const form = useForm<CreatePrice>({
    resolver: zodResolver(CreateAttributeSchema),
    defaultValues: {}
  })

  function onSubmit(data: CreatePrice) {
    const { attributeId, isVariant, sku, value } = data

    createAttributeValueMutation.mutate({
      createAttributeValueInput: {
        attributeId,
        isVariant,
        productId,
        sku,
        value
      }
    })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {t("common:add_entity", {
                    entity: t("common:attribute")
                  })}
                </DialogTitle>
              </DialogHeader>
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:product_sku")}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isVariant"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel noStyle>{t("common:variant")}</FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DialogContent>
          </form>
        </Form>
      </Dialog>
      <div>
        <h2 className="section-title">
          {t("common:create_product_attributes_section_title")}
        </h2>
        <p className="section-description">
          {t("common:create_product_attributes_section_description")}
        </p>
        <div className="section-body">
          {attributes && attributes.length > 0 && (
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
                  {attributes.map(
                    (attribute) =>
                      attribute && (
                        <tr key={attribute.id}>
                          <td>{attribute.attribute.name}</td>
                          <td>
                            {attribute.value} {attribute.attribute.uom?.name}
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
          )}

          <div className="mt-8 flex justify-end">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setOpen(true)}
            >
              {t("common:add_entity", { entity: t("common:attribute") })}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AttributeSection
