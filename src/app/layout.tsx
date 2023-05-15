import "@/styles/globals.css"
import NextAuthProvider from "@core/providers/NextAuthProvider"
import ReactAriaSSRProvider from "@core/providers/ReactAriaSSRProvider"
import ReactQueryProvider from "@core/providers/ReactQueryProvider"
import useTranslation from "next-translate/useTranslation"

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
          <NextAuthProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </NextAuthProvider>
        </body>
      </html>
    </ReactAriaSSRProvider>
  )
}
