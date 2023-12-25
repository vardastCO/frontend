export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return <div className="flex h-full flex-col gap-1">{children}</div>
}
