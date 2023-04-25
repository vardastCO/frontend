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
                  className="d-dialog-close btn-ghost btn rounded-full"
                  aria-label="Close"
                >
                  <IconX className="icon" />
                </button>
              </Dialog.Close>
            </div>
            <div className="d-dialog-content">
              <CreateCountryForm />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default CreateCountry
