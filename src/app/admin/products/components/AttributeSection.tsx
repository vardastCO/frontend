import useTranslation from "next-translate/useTranslation"

import { AttributeValue, Maybe } from "@/generated"

import { Button } from "@core/components/ui/button"

type AttributeSectionProps = {
  attributes: Maybe<AttributeValue>[] | undefined
  onOpenCreateModal: () => void
}

const AttributeSection = ({
  onOpenCreateModal,
  attributes
}: AttributeSectionProps) => {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="section-title">
        {t("common:create_product_attributes_section_title")}
      </h2>
      <p className="section-description">
        {t("common:create_product_attributes_section_description")}
      </p>
      <div className="section-body">
        {attributes && attributes.length > 0 && (
          <div className="card table-responsive rounded">
            <table className="table">
              <thead>
                <tr>
                  <th>{t("common:attribute")}</th>
                  <th>{t("common:value")}</th>
                  <th>{t("common:product_sku")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {attributes.map(
                  (attribute) =>
                    attribute && (
                      <tr key={attribute.id}>
                        <td>{attribute.attribute.name}</td>
                        <td>
                          {attribute.value} {attribute.attribute.uom?.name}
                        </td>
                        <td>{attribute.sku}</td>
                        <td>
                          <Button size="small" variant="secondary">
                            {t("common:edit")}
                          </Button>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <Button
            variant="secondary"
            type="button"
            onClick={() => onOpenCreateModal()}
          >
            {t("common:add_entity", { entity: t("common:attribute") })}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AttributeSection
