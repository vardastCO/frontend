import Link from "next/link"
import useTranslation from "next-translate/useTranslation"

import PageHeader from "@core/components/shared/PageHeader"
import { Button } from "@core/components/ui/button"

import UOMs from "./components/UOMs"

const UOMsIndex = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader title={t("common:uoms_index_title")}>
        <Link href="/admin/uoms/new">
          <Button size="medium">
            {t("common:add_entity", { entity: t("common:uom") })}
          </Button>
        </Link>
      </PageHeader>
      <UOMs />
    </>
  )
}

export default UOMsIndex
