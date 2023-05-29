import { Input } from "@core/components/Input"
import { Radio, RadioGroup } from "@core/components/RadioGroup"
import { TextField } from "@core/components/TextField"
import {
  IconGift,
  IconPackage,
  IconPackages,
  IconWorld
} from "@tabler/icons-react"
import useTranslation from "next-translate/useTranslation"

type Props = {}

const ProductForm = (props: Props) => {
  const { t } = useTranslation()
  return (
    <>
      <div className="create-product flex flex-col gap-6">
        <TextField label={t("common:product_name")}>
          <Input inputSize="large" />
        </TextField>

        <div>
          <RadioGroup name="productType" label={t("product:product_type")}>
            <div className="grid grid-cols-4 gap-6">
              <Radio value="pt_n" className="product-type-item">
                <div className="product-type-item-label">
                  <IconPackage
                    className="product-type-item-icon"
                    stroke={1.5}
                  />
                  <span className="product-type-item-title">
                    {t("product:physical")}
                  </span>
                </div>
                <span className="product-type-item-description">
                  {t("product:physical_product_type_description")}
                </span>
              </Radio>
              <Radio value="pt_h" className="product-type-item">
                <div className="product-type-item-label">
                  <IconWorld className="product-type-item-icon" stroke={1.5} />
                  <span className="product-type-item-title">
                    {t("product:digital")}
                  </span>
                </div>
                <span className="product-type-item-description">
                  {t("product:digital_product_type_description")}
                </span>
              </Radio>
              <Radio value="pt_k" className="product-type-item">
                <div className="product-type-item-label">
                  <IconPackages
                    className="product-type-item-icon"
                    stroke={1.5}
                  />
                  <span className="product-type-item-title">
                    {t("product:bundle")}
                  </span>
                </div>
                <span className="product-type-item-description">
                  {t("product:bundle_product_type_description")}
                </span>
              </Radio>
              <Radio value="pt_g" className="product-type-item">
                <div className="product-type-item-label">
                  <IconGift className="product-type-item-icon" stroke={1.5} />
                  <span className="product-type-item-title">
                    {t("product:gift_card")}
                  </span>
                </div>
                <span className="product-type-item-description">
                  {t("product:gift_card_product_type_description")}
                </span>
              </Radio>
            </div>
          </RadioGroup>
        </div>

        {/* status */}
        {/* images */}
        <TextField label={t("common:slug")}>
          <Input />
        </TextField>
      </div>
    </>
  )
}

export default ProductForm
