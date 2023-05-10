import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import CountryCard from "@/@core/components/admin/Location/CountryCard"
import CreateCountry from "@/@core/components/admin/Location/CreateCountry"
import NoCountryFound from "@/@core/components/admin/Location/NoCountryFound"
import Loading from "@/@core/components/shared/Loading/Loading"
import LoadingFailed from "@/@core/components/shared/LoadingFailed/LoadingFailed"
import PageHeader from "@/@core/components/shared/PageHeader/PageHeader"
import { Button } from "@/@core/components/ui/Button"
import { Dialog } from "@/@core/components/ui/Dialog"
import { Modal, ModalContent, ModalHeader } from "@/@core/components/ui/Modal"
import AdminLayout from "@/@core/layouts/AdminLayout"
import { Country, useGetAllCountriesQuery } from "@/generated"
import { NextPageWithLayout } from "@/pages-old/_app"
import { IconAlertOctagon } from "@tabler/icons-react"
import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { ReactElement, useState } from "react"

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string))
    }
  }
}

const LocationsIndex: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false)

  const { isLoading, error, data } =
    useGetAllCountriesQuery(graphqlRequestClient)

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.countries) return <NoCountryFound />

  return (
    <>
      <Modal size="large" isOpen={open} onOpenChange={setOpen}>
        <Dialog>
          {({ close }) => (
            <div className="flex">
              <div className="flex-1 pr-6 pt-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <IconAlertOctagon className="h-6 w-6" />
                </span>
              </div>
              <div>
                <ModalHeader title={t("warning")} />
                <ModalContent>
                  <p className="leading-loose">
                    {t(
                      "are_you_sure_you_want_to_delete_this_entity_this_action_cannot_be_undone_and_all_associated_data_will_be_permanently_removed",
                      {
                        entity: `${t("country")}`,
                        interpolation: { escapeValue: false }
                      }
                    )}
                  </p>
                  <div className="mt-8 flex items-center justify-end gap-2">
                    <Button intent="ghost">{t("cancel")}</Button>
                    <Button intent="danger">{t("delete")}</Button>
                  </div>
                </ModalContent>
              </div>
            </div>
          )}
        </Dialog>
      </Modal>

      <PageHeader title={t("locations.indexTitle")}>
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
