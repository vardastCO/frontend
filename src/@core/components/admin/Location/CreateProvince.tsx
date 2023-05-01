import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import {
  persianInputSchema,
  slugSchema,
  tsReactFormDefaultMapping
} from "@/@core/utils/tsReactFormDefaultMapping"
import { useCreateProvinceMutation } from "@/generated"
import { useQueryClient } from "@tanstack/react-query"
import { createTsForm } from "@ts-react/form"
import { useTranslation } from "next-i18next"
import { useState } from "react"
import { z } from "zod"
import { makeZodI18nMap } from "zod-i18n-map"
import { Button } from "../../ui/Button"
import { Dialog } from "../../ui/Dialog"
import { ModalTrigger } from "../../ui/Modal"

const MyForm = createTsForm(tsReactFormDefaultMapping)

type Props = {
  countryId: number
}

const CreateProvince = ({ countryId }: Props) => {
  const { t } = useTranslation("common")
  const [open, setOpen] = useState(false)
  z.setErrorMap(makeZodI18nMap({ t }))
  const queryClient = useQueryClient()
  const createProvinceMutation = useCreateProvinceMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GetCountry"] })
        setOpen(false)
      }
    }
  )

  const CreateCategorySchema = z.object({
    name: persianInputSchema.describe(t("name")),
    nameEn: z.string().describe(t("english_name")),
    slug: slugSchema.describe(t("slug")),
    sort: z.number().optional().default(0).describe(t("sort")),
    isActive: z.boolean().optional().default(true).describe(t("is_active"))
  })
  function onSubmit(data: z.infer<typeof CreateCategorySchema>) {
    const { name, nameEn, slug, sort, isActive } = data
    createProvinceMutation.mutate({
      input: {
        countryId,
        name,
        nameEn,
        slug,
        sort,
        isActive
      }
    })
  }

  return (
    <ModalTrigger isDismissable label={t("add_province")}>
      {(close) => (
        <Dialog title={t("new_province")}>
          {createProvinceMutation.isError && <p>خطایی رخ داده</p>}
          <MyForm
            formProps={{
              className: "flex flex-col gap-4"
            }}
            props={{
              nameEn: {
                direction: "ltr"
              },
              slug: {
                direction: "ltr",
                prefixAddon: "https://"
              }
            }}
            defaultValues={{
              sort: 0,
              isActive: true
            }}
            schema={CreateCategorySchema}
            onSubmit={onSubmit}
            renderAfter={() => (
              <div className="flex items-center justify-end gap-2">
                <Button intent="ghost" onPress={close}>
                  {t("cancel")}
                </Button>
                <Button type="submit">{t("submit")}</Button>
              </div>
            )}
          />
        </Dialog>
      )}
    </ModalTrigger>
  )
}

export default CreateProvince