import LoadingFailed from "@/@core/components/shared/LoadingFailed/LoadingFailed";
import AdminLayout from "@/@core/layouts/AdminLayout";
import { IGeolocation } from "@/@core/types/Geolocation";
import { NextPageWithLayout } from "@/pages/_app";
import Link from "next/link";
import { ReactElement } from "react";
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPageWithLayout = () => {
  const { data, error } = useSWR("/api/geolocations", fetcher);

  //Handle the error state
  if (error) return <LoadingFailed />;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file

  const geolocations: Array<IGeolocation> = JSON.parse(data);
  return (
    <>
      <div className="table-responsive">
        <table className="table-striped table">
          <thead>
            <tr>
              <th>نام</th>
              <th>نامک</th>
              <th>تعداد شهر</th>
            </tr>
          </thead>
          <tbody>
            {geolocations.map((geo: IGeolocation, idx: number) => (
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
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Home;