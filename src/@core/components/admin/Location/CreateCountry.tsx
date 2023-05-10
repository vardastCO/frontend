import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import {
  persianInputSchema,
  slugSchema,
  tsReactFormDefaultMapping
} from "@/@core/utils/tsReactFormDefaultMapping"
import { useCreateCountryMutation } from "@/generated"
import { createTsForm } from "@ts-react/form"

import { useState } from "react"
import { DialogTrigger } from "react-aria-components"
import { z } from "zod"

import { Button } from "../../ui/Button"
import { Dialog, DialogContent } from "../../ui/Dialog"
import { Modal } from "../../ui/Modal"

const MyForm = createTsForm(tsReactFormDefaultMapping)

type Props = {}

const CreateCountry = (props: Props) => {
  const [open, setOpen] = useState(false)

  const createCountryMutation = useCreateCountryMutation(graphqlRequestClient, {
    onSuccess: () => {
      setOpen(false)
    }
  })

  const CreateCategorySchema = z.object({
    name: persianInputSchema.describe(t("name")),
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
    <DialogTrigger>
      <Button size="medium">{t("add_entity", { entity: t("country") })}</Button>
      <Modal>
        <Dialog>
          {({ close }) => (
            <DialogContent>
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
                      {t("cancel")}
                    </Button>
                    <Button type="submit">{t("submit")}</Button>
                  </div>
                )}
              />
            </DialogContent>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  )
}

export default CreateCountry
