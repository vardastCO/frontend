import graphqlRequestClient from "@/@core/clients/graphqlRequestClient";
import LocationCountryCard from "@/@core/components/admin/Location/LocationCountryCard";
import PageHeader from "@/@core/components/shared/PageHeader/PageHeader";
import AdminLayout from "@/@core/layouts/AdminLayout";
import { useGetAllCountriesQuery } from "@/generated";
import { NextPageWithLayout } from "@/pages/_app";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

const Home: NextPageWithLayout = () => {
  const { t } = useTranslation("common");

  const { isLoading, error, data } =
    useGetAllCountriesQuery(graphqlRequestClient);

  if (isLoading) return <>Loooooooo</>;
  if (error) return <>Errrrrrr</>;
  return (
    <>
      <PageHeader title={t("locations_index_title")} />
      <div>
        <div className="flex flex-col gap-2">
          {data?.countries?.map((country) => (
            <LocationCountryCard key={country.id} country={country} />
          ))}
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Home;
