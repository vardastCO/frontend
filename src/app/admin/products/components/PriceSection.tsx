import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"
import { formatDistanceToNow, setDefaultOptions } from "date-fns"
import { faIR } from "date-fns/locale"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import {
  Maybe,
  Price,
  PriceTypesEnum,
  useCreatePriceMutation
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

setDefaultOptions({
  locale: faIR,
  weekStartsOn: 6
})

type PriceSectionProps = {
  productId: number
  prices: Maybe<Price>[] | undefined
}

const PriceSection = ({ productId, prices }: PriceSectionProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState<boolean>(false)

  const createPriceMutation = useCreatePriceMutation(graphqlRequestClient)

  const CreatePriceSchema = z.object({
    amount: z.number(),
    type: z.nativeEnum(PriceTypesEnum),
    isPublic: z.boolean().optional().default(true)
  })
  type CreatePrice = TypeOf<typeof CreatePriceSchema>

  const form = useForm<CreatePrice>({
    resolver: zodResolver(CreatePriceSchema),
    defaultValues: {}
  })

  function onSubmit(data: CreatePrice) {
    const { type, isPublic } = data

    createPriceMutation.mutate({
      createPriceInput: {
        productId,
        type,
        sellerId: 0,
        isPublic
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
                    entity: t("common:price")
                  })}
                </DialogTitle>
              </DialogHeader>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:amount")}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel noStyle>{t("common:public")}</FormLabel>
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
          {t("common:create_product_pricing_section_title")}
        </h2>
        <p className="section-description">
          {t("common:create_product_pricing_section_description")}
        </p>

        <div className="section-body">
          {prices && prices.length > 0 && (
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
                  {prices.map(
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
          )}

          <div className="mt-8 flex justify-end">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setOpen(true)}
            >
              {t("common:add_entity", { entity: t("common:price") })}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PriceSection
