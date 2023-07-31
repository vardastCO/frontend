import Link from "next/link"
import useTranslation from "next-translate/useTranslation"

import PageHeader from "@core/components/shared/PageHeader"
import { Button } from "@core/components/ui/button"

import Users from "./components/Users"

const UsersIndex = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader title={t("common:users_index_title")}>
        <Link href="/admin/users/new">
          <Button size="medium">
            {t("common:add_entity", { entity: t("common:user") })}
          </Button>
        </Link>
      </PageHeader>
      <Users />
    </>
  )
}

export default UsersIndex
