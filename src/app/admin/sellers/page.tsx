import Link from "next/link"
import useTranslation from "next-translate/useTranslation"

import PageHeader from "@core/components/shared/PageHeader"
import { Button } from "@core/components/ui/button"
import Sellers from "@/app/admin/sellers/components/Sellers"

const SellersIndex = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader title={t("common:sellers_index_title")}>
        <Link href="/admin/sellers/new">
          <Button size="medium">
            {t("common:add_entity", { entity: t("common:seller") })}
          </Button>
        </Link>
      </PageHeader>
      <Sellers />
    </>
  )
}

export default SellersIndex
