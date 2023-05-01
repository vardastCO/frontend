import { tsReactFormDefaultMapping } from "@/@core/utils/tsReactFormDefaultMapping"
import { createTsForm } from "@ts-react/form"
import { useTranslation } from "next-i18next"
import { z } from "zod"
import { makeZodI18nMap } from "zod-i18n-map"
import { Button } from "../../ui/Button"
import { Dialog } from "../../ui/Dialog"
import { ModalTrigger } from "../../ui/Modal"

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
    <ModalTrigger isDismissable label={t("Add category")}>
      {(close) => (
        <Dialog title={t("New category")}>
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
        </Dialog>
      )}
    </ModalTrigger>
  )
}

export default CreateCategory