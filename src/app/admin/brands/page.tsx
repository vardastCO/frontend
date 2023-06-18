import Link from "next/link"
import useTranslation from "next-translate/useTranslation"

import PageHeader from "@core/components/shared/PageHeader"
import { Button } from "@core/components/ui/button"

import Brands from "./components/Brands"

const BrandsIndex = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader title={t("common:brands_index_title")}>
        <Link href="/admin/brands/new">
          <Button size="medium">
            {t("common:add_entity", { entity: t("common:brand") })}
          </Button>
        </Link>
      </PageHeader>
      <Brands />
    </>
  )
}

export default BrandsIndex
