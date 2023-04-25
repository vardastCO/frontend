import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import TextField from "@/@core/components/shared/Form/TextField"
import { useCreateCountryMutation } from "@/generated"
import { createTsForm } from "@ts-react/form"
import { useTranslation } from "next-i18next"
import { z } from "zod"
import { makeZodI18nMap } from "zod-i18n-map"
import CheckboxField from "../../shared/Form/CheckboxField"
import NumberField from "../../shared/Form/NumberField"

const mapping = [
  [z.string(), TextField],
  [z.number(), NumberField],
  [z.boolean(), CheckboxField]
] as const
const MyForm = createTsForm(mapping)

type Props = {}
const CreateCountryForm = (props: Props) => {
  const { t } = useTranslation("common")
  z.setErrorMap(makeZodI18nMap({ t }))
  const createCountryMutation = useCreateCountryMutation(graphqlRequestClient)

  const CreateCategorySchema = z.object({
    name: z.string().describe(t("name")),
    nameEn: z.string().describe(t("english_name")),
    alphaTwo: z.string().length(2).describe(t("alpha_two_name")),
    iso: z.string().describe(t("iso_name")),
    phonePrefix: z.string().describe(t("phone_prefix")),
    sort: z.number().optional().describe(t("sort")),
    isActive: z.boolean().optional().describe(t("is_active"))
  })
  function onSubmit(data: z.infer<typeof CreateCategorySchema>) {
    // gets typesafe data when form is submitted
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
  }

  return (
    <MyForm
      formProps={{
        className: "flex flex-col gap-4"
      }}
      defaultValues={{
        sort: 0
      }}
      schema={CreateCategorySchema}
      onSubmit={onSubmit}
      renderAfter={() => (
        <div className="flex items-center justify-end gap-2">
          <button className="btn-ghost btn" type="button">
            {t("cancel")}
          </button>
          <button className="btn-primary btn" type="submit">
            {t("submit")}
          </button>
        </div>
      )}
    />
  )
}

export default CreateCountryForm
