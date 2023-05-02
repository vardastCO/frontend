import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import CountryCard from "@/@core/components/admin/Location/CountryCard"
import CreateCountry from "@/@core/components/admin/Location/CreateCountry"
import NoCountryFound from "@/@core/components/admin/Location/NoCountryFound"
import Loading from "@/@core/components/shared/Loading/Loading"
import LoadingFailed from "@/@core/components/shared/LoadingFailed/LoadingFailed"
import PageHeader from "@/@core/components/shared/PageHeader/PageHeader"
import { Button } from "@/@core/components/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader
} from "@/@core/components/ui/Dialog"
import { Modal } from "@/@core/components/ui/Modal"
import AdminLayout from "@/@core/layouts/AdminLayout"
import { Country, useGetAllCountriesQuery } from "@/generated"
import { NextPageWithLayout } from "@/pages/_app"
import { IconAlertOctagon } from "@tabler/icons-react"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  }
}

const LocationsIndex: NextPageWithLayout = () => {
  const { t } = useTranslation("common")

  const { isLoading, error, data } =
    useGetAllCountriesQuery(graphqlRequestClient)

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.countries) return <NoCountryFound />

  return (
    <>
      <Modal isDismissable state={close} size="large">
        <Dialog>
          <div className="flex">
            <div className="flex-1 pr-6 pt-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                <IconAlertOctagon className="h-6 w-6" />
              </span>
            </div>
            <div>
              <DialogHeader title={t("warning")} />
              <DialogContent>
                <p className="leading-loose">
                  {t(
                    "are_you_sure_you_want_to_delete_this_entity_this_action_cannot_be_undone_and_all_associated_data_will_be_permanently_removed",
                    {
                      entity: `${t("country")}`,
                      interpolation: { escapeValue: false }
                    }
                  )}
                </p>
              </DialogContent>
            </div>
          </div>
          <DialogFooter>
            <div className="flex items-center justify-end">
              <Button intent="ghost">{t("cancel")}</Button>
              <Button intent="danger">{t("delete")}</Button>
            </div>
          </DialogFooter>
        </Dialog>
      </Modal>

      <PageHeader title={t("locations_index_title")}>
        <CreateCountry />
      </PageHeader>
      <div>
        <div className="flex flex-col gap-2">
          {data?.countries?.map((country) => (
            <CountryCard key={country.id} country={country as Country} />
          ))}
        </div>
      </div>
    </>
  )
}

LocationsIndex.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default LocationsIndex
