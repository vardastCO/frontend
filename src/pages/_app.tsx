import "@/styles/globals.css";
import { DefaultContext, MessengerContext } from "@ndpco/messenger";
import { faIR } from "date-fns/locale";
import setDefaultOptions from "date-fns/setDefaultOptions";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

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

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <MessengerContext.Provider value={DefaultContext}>
      <Component {...pageProps} />
    </MessengerContext.Provider>
  );
}
