import { Input } from "@core/components/Input"
import { TextField } from "@core/components/TextField"
import useTranslation from "next-translate/useTranslation"

type Props = {}

const ProductForm = (props: Props) => {
  const { t } = useTranslation()
  return (
    <>
      <TextField label={t("common:product_name")}>
        <Input />
      </TextField>
      <TextField label={t("common:slug")}>
        <Input />
      </TextField>
    </>
  )
}

export default ProductForm
