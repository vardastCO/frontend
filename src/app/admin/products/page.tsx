import { Button } from "@core/components/Button"
import PageHeader from "@core/components/shared/PageHeader"
import type { Metadata } from "next"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import Products from "./components/Products"

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js"
}

const ProductsIndex = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader title={t("common:products_index_title")}>
        <Link href="/admin/products/new">
          <Button size="medium">
            {t("common:add_entity", { entity: t("common:product") })}
          </Button>
        </Link>
      </PageHeader>
      <Products />
    </>
  )
}

export default ProductsIndex
