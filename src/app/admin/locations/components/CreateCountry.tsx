"use client"

import { useCreateCountryMutation } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import {
  persianInputSchema,
  slugSchema,
  tsReactFormDefaultMapping
} from "@core/utils/tsReactFormDefaultMapping"
import { createTsForm } from "@ts-react/form"

import { useState } from "react"
import { DialogTrigger } from "react-aria-components"
import { z } from "zod"

import useTranslation from "next-translate/useTranslation"
import { Button } from "../../../../@core/components/ui/Button"
import { Dialog } from "../../../../@core/components/ui/Dialog"
import { Modal, ModalContent } from "../../../../@core/components/ui/Modal"

const MyForm = createTsForm(tsReactFormDefaultMapping)

type Props = {}

const CreateCountry = (props: Props) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const createCountryMutation = useCreateCountryMutation(graphqlRequestClient, {
    onSuccess: () => {
      setOpen(false)
    }
  })

  const CreateCategorySchema = z.object({
    name: persianInputSchema.describe(t("common:name")),
    nameEn: z.string().describe(t("common:english_name")),
    slug: slugSchema.describe(t("common:slug")),
    alphaTwo: z.string().length(2).describe(t("common:alpha_two_name")),
    iso: z.string().describe(t("common:iso_name")),
    phonePrefix: z.string().describe(t("common:phone_prefix")),
    sort: z.number().optional().default(0).describe(t("common:sort")),
    isActive: z
      .boolean()
      .optional()
      .default(true)
      .describe(t("common:is_active"))
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
    <DialogTrigger>
      <Button size="medium">
        {t("common:add_entity", { entity: t("common:country") })}
      </Button>
      <Modal>
        <Dialog>
          {({ close }) => (
            <ModalContent>
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
                    prefixElement: <span className="text-gray-400">+</span>
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
                      {t("common:cancel")}
                    </Button>
                    <Button type="submit">{t("common:submit")}</Button>
                  </div>
                )}
              />
            </ModalContent>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  )
}

export default CreateCountry
