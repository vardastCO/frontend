import LocationProvinceCard from "@/@core/components/admin/Location/LocationProvinceCard";
import PageHeader from "@/@core/components/shared/PageHeader/PageHeader";
import AdminLayout from "@/@core/layouts/AdminLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

const Home: NextPageWithLayout = () => {
  const { t } = useTranslation("common");
  const { slug } = useRouter().query;
  let queries: { [k: string]: string } = {};
  if (Array.isArray(slug)) {
    slug.forEach((current, idx) => {
      if (idx % 2) queries[slug[idx - 1]] = current;
    });
  }

  const listType = Object.keys(queries).at(-1);

  return (
    <>
      <PageHeader title={t("locations_index_title")} />
      <div>
        <div className="flex flex-col gap-2">
          {listType === "country" && <LocationProvinceCard />}
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Home;
