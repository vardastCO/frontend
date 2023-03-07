import AdminLayout from "@/@core/layouts/AdminLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Link from "next/link";
import { ReactElement } from "react";
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

const Home: NextPageWithLayout = () => {
  const { data, error } = useSWR("/api/geolocations", fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file

  const geolocations = JSON.parse(data);
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>نام</th>
            <th>نامک</th>
            <th>تعداد شهر</th>
          </tr>
        </thead>
        <tbody>
          {geolocations.map((geo, idx) => (
            <tr key={idx}>
              <td>
                <Link href={`/admin/geolocations/${geo.id}`}>{geo.name}</Link>
              </td>
              <td>{geo.slug}</td>
              <td>{geo.children && geo.children.length - 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Home;
