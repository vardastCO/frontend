"use client"

import { Button } from "@core/components/ui/Button"
import { Dialog } from "@core/components/ui/Dialog"
import { Modal, ModalContent, ModalHeader } from "@core/components/ui/Modal"
import { IconAlertOctagon } from "@tabler/icons-react"
import useTranslation from "next-translate/useTranslation"
import { useState } from "react"

type Props = {}

const DeleteModal = (props: Props) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <Modal size="large" isOpen={open} onOpenChange={setOpen}>
      <Dialog>
        {({ close }) => (
          <div className="flex">
            <div className="flex-1 pr-6 pt-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                <IconAlertOctagon className="h-6 w-6" />
              </span>
            </div>
            <div>
              <ModalHeader title={t("warning")} />
              <ModalContent>
                <p className="leading-loose">
                  {t(
                    "are_you_sure_you_want_to_delete_this_entity_this_action_cannot_be_undone_and_all_associated_data_will_be_permanently_removed",
                    {
                      entity: `${t("country")}`,
                      interpolation: { escapeValue: false }
                    }
                  )}
                </p>
                <div className="mt-8 flex items-center justify-end gap-2">
                  <Button intent="ghost">{t("cancel")}</Button>
                  <Button intent="danger">{t("delete")}</Button>
                </div>
              </ModalContent>
            </div>
          </div>
        )}
      </Dialog>
    </Modal>
  )
}

export default DeleteModal
