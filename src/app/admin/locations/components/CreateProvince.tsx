"use client"

import { useCreateProvinceMutation } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import {
  persianInputSchema,
  slugSchema,
  tsReactFormDefaultMapping
} from "@core/utils/tsReactFormDefaultMapping"
import { useQueryClient } from "@tanstack/react-query"
import { createTsForm } from "@ts-react/form"

import { useState } from "react"
import { DialogTrigger } from "react-aria-components"
import { z } from "zod"

import useTranslation from "next-translate/useTranslation"
import { Button } from "../../../../@core/components/ui/Button"
import { Dialog } from "../../../../@core/components/ui/Dialog"
import { Modal, ModalContent } from "../../../../@core/components/ui/Modal"

const MyForm = createTsForm(tsReactFormDefaultMapping)

type Props = {
  countryId: number
}

const CreateProvince = ({ countryId }: Props) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

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
    <DialogTrigger>
      <Button size="medium">
        {t("add_entity", { entity: t("province") })}
      </Button>
      <Modal>
        <Dialog>
          {({ close }) => (
            <ModalContent>
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
            </ModalContent>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  )
}

export default CreateProvince
