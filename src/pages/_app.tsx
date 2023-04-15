import "@/styles/globals.css";
import { DefaultContext, MessengerContext } from "@ndpco/messenger";
import { faIR } from "date-fns/locale";
import setDefaultOptions from "date-fns/setDefaultOptions";
import { NextPage } from "next";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

setDefaultOptions({
  locale: faIR,
  weekStartsOn: 6,
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: JSX.Element) => JSX.Element;
};

type AppPropsWithLayout<P = {}> = AppProps<P> & {
  Component: NextPageWithLayout<P>;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page: JSX.Element): JSX.Element => page);

  return getLayout(
    <>
      <NextNProgress />
      <MessengerContext.Provider value={DefaultContext}>
        <Component {...pageProps} />
      </MessengerContext.Provider>
    </>
  );
};

export default appWithTranslation(App);
