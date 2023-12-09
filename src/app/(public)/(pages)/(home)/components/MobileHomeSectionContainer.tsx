import { PropsWithChildren } from "react"
import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

import Link from "@core/components/shared/Link"

export interface IMobileHomeSectionContainer {
  title?: string
  viewAllHref?: string
  bgWhite?: boolean
}

const MobileHomeSectionContainer: React.FC<
  PropsWithChildren<IMobileHomeSectionContainer>
> = ({ title = "", viewAllHref, bgWhite = false, children }) => {
  return (
    <div
      className={clsx("flex flex-col gap-y-2 py", bgWhite && "bg-alpha-white")}
    >
      {title && (
        <div className="flex items-center justify-between p">
          <h4 className={`font-medium`}>{title}</h4>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="flex items-center gap-x-0.5 text-sm text-primary"
            >
              مشاهده همه
              <ChevronLeftIcon className="h-4 w-4 text-primary" />
            </Link>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

export default MobileHomeSectionContainer
