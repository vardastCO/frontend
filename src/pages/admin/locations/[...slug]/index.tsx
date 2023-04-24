import LocationProvinceCard from "@/@core/components/admin/Location/LocationProvinceCard";
import PageHeader from "@/@core/components/shared/PageHeader/PageHeader";
import AdminLayout from "@/@core/layouts/AdminLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

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
  const router = useRouter();
  const slug = router.query.slug as string[];
  let queries: { [k: string]: string } = {};
  slug.forEach((current, idx) => {
    if (idx % 2) queries[slug[idx - 1]] = current;
  });

  //   const { isLoading, error, data } = useGetCountryQuery(graphqlRequestClient, {
  //     id: queries.country,
  //   });

  const listType = Object.keys(queries).at(-1);

  useEffect(() => {
    const allowedRoutes = ["country", "province", "city", "state", "area"];
    if (
      !(slug.length % 2 === 0) ||
      !listType ||
      allowedRoutes.indexOf(listType) === -1
    ) {
      router.push("/admin/locations");
    }
  }, [listType, slug, router]);

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
