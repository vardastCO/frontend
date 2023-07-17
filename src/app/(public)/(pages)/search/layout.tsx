export default function SearchLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 pt-1 md:py-8">
      <div>{children}</div>
    </div>
  )
}
