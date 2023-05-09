interface PageHeaderProps {
  children?: React.ReactNode
  title: string
  slot?: React.ReactNode
}

function PageHeader({ children, title, slot }: PageHeaderProps) {
  return (
    <div className="mb-6 mt-8">
      {/* <button className="btn-sm btn">
        <IconChevronRight className="icon" />
        <span>مناطق جغرافیایی</span>
      </button> */}
      <div className="flex items-end">
        <h1 className="text-3xl font-black text-gray-800">{title}</h1>
        <div className="mr-auto">{children}</div>
      </div>
    </div>
  )
}

export default PageHeader
