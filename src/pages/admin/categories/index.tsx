import CategoryList from "@/@core/components/admin/Category/CategoryList";
import CreateCategory from "@/@core/components/admin/Category/CreateCategory";
import LoadingFailed from "@/@core/components/shared/LoadingFailed/LoadingFailed";
import PageHeader from "@/@core/components/shared/PageHeader/PageHeader";
import AdminLayout from "@/@core/layouts/AdminLayout";
import { ICategory } from "@/@core/types/Category";
import { NextPageWithLayout } from "@/pages/_app";
import { IconMinus, IconPlus, IconSearch } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react";
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

const AdminCategoriesPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common");
  const { data, error } = useSWR("/api/categories", fetcher);

  //Handle the error state
  if (error) return <LoadingFailed />;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file

  const categories: Array<ICategory> = JSON.parse(data);
  return (
    <>
      <PageHeader
        title={t("categories_index_title")}
        slot={<CreateCategory />}
      />
      <div>
        <div className="flex items-center gap-6">
          <div className="w-1/2">
            <div className="input-inset">
              <div className="input-element">
                <IconSearch className="text-n-gray-400 w-4 h-4" />
              </div>
              <input
                type="text"
                className="input-field"
                placeholder={t("Search in {{ entity }}", {
                  entity: t("Categories"),
                }).toString()}
              />
            </div>
          </div>
          <div className="btn-group mr-auto">
            <button className="btn btn-xs btn-secondary">
              <IconMinus className="icon" />
              <span>{t("Collapse All")}</span>
            </button>
            <button className="btn btn-xs btn-secondary">
              <IconPlus className="icon" />
              <span>{t("Expand All")}</span>
            </button>
          </div>
        </div>
        <div className="mt-12">
          <CategoryList categories={categories} />
        </div>
      </div>
    </>
  );
};

AdminCategoriesPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminCategoriesPage;
