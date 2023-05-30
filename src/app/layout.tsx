import "@/styles/globals.css"
import { GlobalToastRegion } from "@core/components/Toast"
import NextAuthProvider from "@core/providers/NextAuthProvider"
import NextThemeProvider from "@core/providers/NextThemeProvider"
import ReactAriaSSRProvider from "@core/providers/ReactAriaSSRProvider"
import ReactQueryProvider from "@core/providers/ReactQueryProvider"
import useTranslation from "next-translate/useTranslation"
import NextTopLoader from "nextjs-toploader"

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { lang } = useTranslation()

  return (
    <ReactAriaSSRProvider>
      <html lang={lang}>
        <body>
          <NextTopLoader
            color="#030712"
            showSpinner={false}
            shadow="0 0 10px #030712,0 0 5px #030712"
          />
          <NextAuthProvider>
            <ReactQueryProvider>
              <NextThemeProvider>
                {children}
                <GlobalToastRegion />
              </NextThemeProvider>
            </ReactQueryProvider>
          </NextAuthProvider>
        </body>
      </html>
    </ReactAriaSSRProvider>
  )
}
