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
    <div className={clsx("flex flex-col pt-7", bgWhite && "bg-alpha-white")}>
      {title && (
        <div className="flex items-center justify-between p-7 pt-0">
          <h4 className={`font-medium`}>{title}</h4>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="flex items-center gap-x-0.5 text-sm font-semibold text-primary"
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
