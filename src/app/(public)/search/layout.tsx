export default function SearchLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4">
      <div className="py-4"></div>
      <div>{children}</div>
    </div>
  )
}
