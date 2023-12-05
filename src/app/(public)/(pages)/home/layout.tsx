export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    // <div className="flex flex-col gap-y-8 bg-alpha-white pt">{children}</div>
    <div className="flex h-full flex-col gap-y-8 bg-alpha-white pt">
      {children}
    </div>
  )
}
