import AuthProvider from "@/@core/components/shared/AuthProvider"
import "@/styles/globals.css"
import useTranslation from "next-translate/useTranslation"
// import NextNProgress from "nextjs-progressbar"

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode
}) {
  const { lang } = useTranslation()
  return (
    <AuthProvider>
      <html lang={lang}>
        <body>{children}</body>
      </html>
    </AuthProvider>
  )
}
