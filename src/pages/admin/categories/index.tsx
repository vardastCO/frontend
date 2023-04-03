import LoadingFailed from "@/@core/components/shared/LoadingFailed/LoadingFailed";
import AdminLayout from "@/@core/layouts/AdminLayout";
import { ICategory } from "@/@core/types/Category";
import { NextPageWithLayout } from "@/pages/_app";
import Link from "next/link";
import { ReactElement } from "react";
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AdminCategoriesPage: NextPageWithLayout = () => {
  const { data, error } = useSWR("/api/categories", fetcher);

  //Handle the error state
  if (error) return <LoadingFailed />;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file

  const categories: Array<ICategory> = JSON.parse(data);
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>نام</th>
            <th>نامک</th>
            <th>تعداد زیردسته‌ها</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: ICategory, idx: number) => (
            <tr key={idx}>
              <td>
                <Link href={`/admin/categories/${category.slug}`}>
                  {category.title}
                </Link>
              </td>
              <td>{category.slug}</td>
              <td>{category.children && category.children.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

AdminCategoriesPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminCategoriesPage;
