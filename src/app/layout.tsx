import "@/styles/globals.css"

import { Metadata } from "next"
import { setDefaultOptions } from "date-fns"
import { faIR } from "date-fns/locale"
import useTranslation from "next-translate/useTranslation"
import NextTopLoader from "nextjs-toploader"

import NextAuthProvider from "@core/providers/NextAuthProvider"
import NextThemeProvider from "@core/providers/NextThemeProvider"
import RadixDirectionProvider from "@core/providers/RadixDirectionProvider"
import ReactQueryProvider from "@core/providers/ReactQueryProvider"
import { Toaster } from "@core/providers/ToasterProvider"

export const metadata: Metadata = {
  title: {
    template: `${process.env.NEXT_PUBLIC_TITLE} | %s`,
    default: process.env.NEXT_PUBLIC_TITLE as string
  },
  manifest: "/manifest.json",
  themeColor: "#ffffff",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    viewportFit: "cover"
  }
}

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { lang } = useTranslation()

  setDefaultOptions({
    locale: faIR,
    weekStartsOn: 6
  })

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
