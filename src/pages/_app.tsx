import "@/styles/globals.css";
import { DefaultContext, MessengerContext } from "@ndpco/messenger";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { faIR } from "date-fns/locale";
import setDefaultOptions from "date-fns/setDefaultOptions";
import { NextPage } from "next";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

setDefaultOptions({
  locale: faIR,
  weekStartsOn: 6,
});

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <MessengerContext.Provider value={DefaultContext}>
          <Component {...pageProps} />
        </MessengerContext.Provider>
      </QueryClientProvider>
    </>
  );
};

export default appWithTranslation(App);
