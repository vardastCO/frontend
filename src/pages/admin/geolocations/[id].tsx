import AdminLayout from "@/@core/layouts/AdminLayout";
import { IGeolocation } from "@/@core/types/Geolocation";
import { NextPageWithLayout } from "@/pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { id: provinceId } = router.query;
  const { data, error } = useSWR("/api/geolocations", fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file

  const province: IGeolocation = JSON.parse(data)
    .filter((geo: IGeolocation) => geo.id == parseInt(provinceId as string, 10))
    .at(0);

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
            {province.children &&
              province.children.map((city: IGeolocation, idx: number) => (
                <tr key={idx}>
                  <td>
                    <Link href={`/admin/geolocations/${city.id}`}>
                      {city.name}
                    </Link>
                  </td>
                  <td>{city.slug}</td>
                  <td>{city.children && city.children.length - 1}</td>
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
