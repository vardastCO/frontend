import PageHeader from "@core/components/shared/PageHeader"
import useTranslation from "next-translate/useTranslation"
import Users from "./components/Users"

const UsersIndex = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader title={t("common:users_index_title")}></PageHeader>
      <Users />
    </>
  )
}

export default UsersIndex
