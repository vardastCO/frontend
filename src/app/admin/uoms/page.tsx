import { Button } from "@core/components/Button"
import PageHeader from "@core/components/shared/PageHeader"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import UOMs from "./components/UOMs"

const UOMsIndex = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader title={t("common:uoms_index_title")}>
        <Link href="/admin/uoms/new">
          <Button size="medium">{t("common:add_entity", { entity: t("common:uom") })}</Button>
        </Link>
      </PageHeader>
      <UOMs />
    </>
  )
}

export default UOMsIndex
