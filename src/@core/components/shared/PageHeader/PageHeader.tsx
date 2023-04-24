import { ReactElement } from "react"

interface PageHeaderProps {
  title: string
  slot?: ReactElement
}

function PageHeader({ title, slot }: PageHeaderProps) {
  return (
    <div className="mb-6 mt-8">
      {/* <button className="btn-sm btn">
        <IconChevronRight className="icon" />
        <span>مناطق جغرافیایی</span>
      </button> */}
      <div className="flex items-end">
        <h1 className="text-3xl font-black text-n-gray-800">{title}</h1>
        {slot && <div className="mr-auto">{slot}</div>}
      </div>
    </div>
  )
}

export default PageHeader
