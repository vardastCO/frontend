import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import { persianCharactersValidator } from "@/@core/utils/persianCharactersValidator"
import { slugValidator } from "@/@core/utils/slugValidator"
import { useCreateCountryMutation } from "@/generated"
import * as Dialog from "@radix-ui/react-dialog"
import { IconX } from "@tabler/icons-react"
import { createTsForm, createUniqueFieldSchema } from "@ts-react/form"
import { useTranslation } from "next-i18next"
import { useState } from "react"
import { z } from "zod"
import { makeZodI18nMap } from "zod-i18n-map"
import CheckboxField from "../../shared/Form/CheckboxField"
import NumberField from "../../shared/Form/NumberField"
import TextField from "../../shared/Form/TextField"

const slugSchema = createUniqueFieldSchema(
  z.string().refine((data) => slugValidator(data), {
    message: "مقدار نامک صحیح نیست"
  }),
  "slug"
)
const mapping = [
  [z.string(), TextField],
  [z.number(), NumberField],
  [z.boolean(), CheckboxField],
  [slugSchema, TextField]
] as const
const MyForm = createTsForm(mapping)

type Props = {}

const CreateCountry = (props: Props) => {
  const { t } = useTranslation("common")
  const [open, setOpen] = useState(false)
  z.setErrorMap(makeZodI18nMap({ t }))
  const createCountryMutation = useCreateCountryMutation(graphqlRequestClient, {
    onSuccess: () => {
      setOpen(false)
    }
  })

  const CreateCategorySchema = z.object({
    name: z
      .string()
      .describe(t("name"))
      .refine((data) => persianCharactersValidator(data), {
        message: "مقدار فیلد باید فارسی باشد"
      }),
    nameEn: z.string().describe(t("english_name")),
    slug: slugSchema.describe(t("slug")),
    alphaTwo: z.string().length(2).describe(t("alpha_two_name")),
    iso: z.string().describe(t("iso_name")),
    phonePrefix: z.string().describe(t("phone_prefix")),
    sort: z.number().optional().default(0).describe(t("sort")),
    isActive: z.boolean().optional().default(true).describe(t("is_active"))
  })
  function onSubmit(data: z.infer<typeof CreateCategorySchema>) {
    const { name, nameEn, alphaTwo, slug, phonePrefix, sort, isActive, iso } =
      data
    createCountryMutation.mutate({
      input: {
        name,
        nameEn,
        alphaTwo,
        slug,
        phonePrefix,
        sort,
        isActive,
        iso
      }
    })
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="btn-primary btn">{t("add_country")}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="d-dialog-overlay" />
        <Dialog.Content className="d-dialog-container">
          <div className="d-dialog-inner">
            <div className="d-dialog-header">
              <Dialog.Title className="d-dialog-title">
                {t("new_country")}
              </Dialog.Title>
              <Dialog.Description className="d-dialog-description">
                {t("new_country_description")}
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
              {createCountryMutation.isError && <p>خطایی رخ داده</p>}
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
                  },
                  alphaTwo: {
                    direction: "ltr"
                  },
                  iso: {
                    direction: "ltr"
                  },
                  phonePrefix: {
                    direction: "ltr",
                    prefixElement: <span className="text-n-gray-400">+</span>
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

export default CreateCountry
