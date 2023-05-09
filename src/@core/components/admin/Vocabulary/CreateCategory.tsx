import { tsReactFormDefaultMapping } from "@/@core/utils/tsReactFormDefaultMapping"
import { createTsForm } from "@ts-react/form"
import { useTranslation } from "next-i18next"
import { DialogTrigger } from "react-aria-components"
import { z } from "zod"
import { makeZodI18nMap } from "zod-i18n-map"
import { Button } from "../../ui/Button"
import { Dialog } from "../../ui/Dialog"
import { Modal, ModalContent } from "../../ui/Modal"

type Props = {}

const MyForm = createTsForm(tsReactFormDefaultMapping)

const CreateCategory = (props: Props) => {
  const { t } = useTranslation("common")
  z.setErrorMap(makeZodI18nMap({ t }))
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
