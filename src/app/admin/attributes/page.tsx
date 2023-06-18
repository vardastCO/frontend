import Link from "next/link"
import useTranslation from "next-translate/useTranslation"

import PageHeader from "@core/components/shared/PageHeader"
import { Button } from "@core/components/ui/button"

import Attributes from "./components/Attributes"

const AttributesIndex = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader title={t("common:attributes_index_title")}>
        <Link href="/admin/attributes/new">
          <Button size="medium">
            {t("common:add_entity", { entity: t("common:attribute") })}
          </Button>
        </Link>
      </PageHeader>
      <Attributes />
    </>
  )
}

export default AttributesIndex
