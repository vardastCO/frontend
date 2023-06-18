import VocabulariesProvider from "./components/VocabulariesProvider"

export default function LocationsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <VocabulariesProvider>{children}</VocabulariesProvider>
}
