import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import {
  persianInputSchema,
  slugSchema,
  tsReactFormDefaultMapping
} from "@/@core/utils/tsReactFormDefaultMapping"
import { useCreateCityMutation } from "@/generated"
import * as Dialog from "@radix-ui/react-dialog"
import { IconX } from "@tabler/icons-react"
import { useQueryClient } from "@tanstack/react-query"
import { createTsForm } from "@ts-react/form"
import { useTranslation } from "next-i18next"
import { useState } from "react"
import { z } from "zod"
import { makeZodI18nMap } from "zod-i18n-map"

const MyForm = createTsForm(tsReactFormDefaultMapping)

type Props = {
  provinceId: number
}

const CreateCity = ({ provinceId }: Props) => {
  const { t } = useTranslation("common")
  const [open, setOpen] = useState(false)
  z.setErrorMap(makeZodI18nMap({ t }))
  const queryClient = useQueryClient()
  const createProvinceMutation = useCreateCityMutation(graphqlRequestClient, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetCountry"] })
      setOpen(false)
    }
  })

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
        provinceId,
        name,
        nameEn,
        slug,
        sort,
        isActive
      }
    })
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="btn-primary btn">{t("add_city")}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="d-dialog-overlay" />
        <Dialog.Content className="d-dialog-container">
          <div className="d-dialog-inner">
            <div className="d-dialog-header">
              <Dialog.Title className="d-dialog-title">
                {t("new_city")}
              </Dialog.Title>
              <Dialog.Description className="d-dialog-description">
                {t("new_city_description")}
              </Dialog.Description>
              <Dialog.Close asChild>
                <button
                  className="d-dialog-close btn-icon-only btn-ghost btn rounded-full"
                  aria-label="Close"
                >
                  <IconX className="icon" />
                </button>
              </Dialog.Close>
            </div>
            <div className="d-dialog-content">
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
                    <Dialog.Close asChild>
                      <button className="btn-ghost btn" type="button">
                        {t("cancel")}
                      </button>
                    </Dialog.Close>
                    <button className="btn-primary btn" type="submit">
                      {t("submit")}
                    </button>
                  </div>
                )}
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default CreateCity
