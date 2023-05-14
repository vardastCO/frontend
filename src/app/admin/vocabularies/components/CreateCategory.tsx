"use client"

import { tsReactFormDefaultMapping } from "@core/utils/tsReactFormDefaultMapping"
import { createTsForm } from "@ts-react/form"

import { DialogTrigger } from "react-aria-components"
import { z } from "zod"

import useTranslation from "next-translate/useTranslation"
import { Button } from "../../../../@core/components/ui/Button"
import { Dialog } from "../../../../@core/components/ui/Dialog"
import { Modal, ModalContent } from "../../../../@core/components/ui/Modal"

type Props = {}

const MyForm = createTsForm(tsReactFormDefaultMapping)

const CreateCategory = (props: Props) => {
  const { t } = useTranslation()
  const CreateCategorySchema = z.object({
    parent: z.string().describe(t("parent")),
    title: z.string().describe(t("title")),
    slug: z.string().describe(t("slug"))
  })
  function onSubmit(data: z.infer<typeof CreateCategorySchema>) {
    // gets typesafe data when form is submitted
  }
  return (
    <DialogTrigger>
      <Button size="medium">
        {t("add_entity", { entity: t("category") })}
      </Button>
      <Modal>
        <Dialog>
          {({ close }) => (
            <ModalContent>
              <MyForm
                formProps={{
                  className: "flex flex-col gap-4"
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

export default CreateCategory
