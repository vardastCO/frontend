export default function SearchLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div>{children}</div>
    </div>
  )
}
