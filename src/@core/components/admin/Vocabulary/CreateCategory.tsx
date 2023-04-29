import * as Dialog from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import CreateCategoryForm from "./CreateCategoryForm";

type Props = {};

const CreateCategory = (props: Props) => {
  const { t } = useTranslation("common");
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="btn btn-primary">{t("Add category")}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">
            {t("New category")}
          </Dialog.Title>
          <Dialog.Description className="dialog-description">
            توسط فرم زیر دسته‌بندی جدید را اضافه کنید
          </Dialog.Description>
          <CreateCategoryForm />
          <Dialog.Close asChild>
            <button className="dialog-close btn" aria-label="Close">
              <IconX className="icon" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateCategory;
