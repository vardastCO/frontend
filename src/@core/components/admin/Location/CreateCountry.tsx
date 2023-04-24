import * as Dialog from "@radix-ui/react-dialog"
import { IconX } from "@tabler/icons-react"
import { useTranslation } from "next-i18next"
import CreateCountryForm from "./CreateCountryForm"

type Props = {}

const CreateCountry = (props: Props) => {
  const { t } = useTranslation("common")
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="btn-primary btn">{t("add_country")}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">
            {t("new_country")}
          </Dialog.Title>
          <Dialog.Description className="dialog-description">
            {t("new_country_description")}
          </Dialog.Description>
          <CreateCountryForm />
          <Dialog.Close asChild>
            <button className="dialog-close btn" aria-label="Close">
              <IconX className="icon" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default CreateCountry
