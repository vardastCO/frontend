import TextField from "@/@core/components/shared/Form/TextField";
import { createTsForm } from "@ts-react/form";
import { useTranslation } from "next-i18next";
import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

const mapping = [[z.string(), TextField]] as const;
const MyForm = createTsForm(mapping);

type Props = {};
const CreateCategoryForm = (props: Props) => {
  const { t } = useTranslation("common");
  z.setErrorMap(makeZodI18nMap({ t }));
  const CreateCategorySchema = z.object({
    parent: z.string().describe(t("parent")),
    title: z.string().describe(t("title")),
    slug: z.string().describe(t("slug")),
  });
  function onSubmit(data: z.infer<typeof CreateCategorySchema>) {
    // gets typesafe data when form is submitted
  }

  return (
    <MyForm
      formProps={{
        className: "flex flex-col gap-4",
      }}
      schema={CreateCategorySchema}
      onSubmit={onSubmit}
      renderAfter={() => (
        <div className="flex items-center justify-end gap-2">
          <button className="btn btn-sm btn-secondary" type="button">
            {t("cancel")}
          </button>
          <button className="btn btn-sm btn-primary" type="submit">
            {t("submit")}
          </button>
        </div>
      )}
    />
  );
};

export default CreateCategoryForm;
