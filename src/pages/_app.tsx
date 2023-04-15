import "@/styles/globals.css";
import { DefaultContext, MessengerContext } from "@ndpco/messenger";
import { faIR } from "date-fns/locale";
import setDefaultOptions from "date-fns/setDefaultOptions";
import { NextPage } from "next";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css";
import { ReactElement, ReactNode } from "react";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

setDefaultOptions({
  locale: faIR,
  weekStartsOn: 6,
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <MessengerContext.Provider value={DefaultContext}>
      <Component {...pageProps} />
    </MessengerContext.Provider>
  );
};

export default appWithTranslation(App);
