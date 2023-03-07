import AdminLayout from "@/@core/layouts/AdminLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";

const Home: NextPageWithLayout = () => {
  return <></>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Home;
