import "@/styles/globals.css"

import useTranslation from "next-translate/useTranslation"
import NextTopLoader from "nextjs-toploader"

import NextAuthProvider from "@core/providers/NextAuthProvider"
import NextThemeProvider from "@core/providers/NextThemeProvider"
import RadixDirectionProvider from "@core/providers/RadixDirectionProvider"
import ReactQueryProvider from "@core/providers/ReactQueryProvider"
import { Toaster } from "@core/providers/ToasterProvider"

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { lang } = useTranslation()

  return (
    <RadixDirectionProvider>
      <html lang={lang} suppressHydrationWarning>
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
                <Toaster />
              </NextThemeProvider>
            </ReactQueryProvider>
          </NextAuthProvider>
        </body>
      </html>
    </RadixDirectionProvider>
  )
}
