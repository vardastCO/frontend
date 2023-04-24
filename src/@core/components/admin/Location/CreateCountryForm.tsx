import graphqlRequestClient from "@/@core/clients/graphqlRequestClient";
import TextField from "@/@core/components/shared/Form/TextField";
import { useCreateCountryMutation } from "@/generated";
import { createTsForm } from "@ts-react/form";
import { useTranslation } from "next-i18next";
import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

const mapping = [[z.string(), TextField]] as const;
const MyForm = createTsForm(mapping);

type Props = {};
const CreateCountryForm = (props: Props) => {
  const { t } = useTranslation("common");
  const createCountryMutation = useCreateCountryMutation(graphqlRequestClient);

  //   createCountryMutation.mutate({
  //     input: {
  //       name: "",
  //       nameEn: "",
  //       alphaTwo: "",
  //       phonePrefix: "",
  //       sort: 0,
  //       isActive: true,
  //       iso: "",
  //     },
  //   });

  z.setErrorMap(makeZodI18nMap({ t }));
  const CreateCategorySchema = z.object({
    name: z.string().describe(t("name")),
    nameEn: z.string().describe(t("english_name")),
    alphaTwo: z.string().describe(t("alpha_two_name")),
    iso: z.string().describe(t("iso_name")),
    phonePrefix: z.string().describe(t("phone_prefix")),
    sort: z.string().describe(t("sort")),
    isActive: z.string().describe(t("is_active")),
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

export default CreateCountryForm;
