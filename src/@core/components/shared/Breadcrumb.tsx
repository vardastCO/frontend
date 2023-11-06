"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

// import useTranslation from "next-translate/useTranslation"

export interface CrumbItemProps {
  label: string
  path: string
  isCurrent: boolean
}

interface BreadcrumbProps {
  dynamic?: boolean
  items?: CrumbItemProps[]
}

const Breadcrumb = ({ items, dynamic = true }: BreadcrumbProps) => {
  // const { t } = useTranslation()
  const pathname = usePathname()
  const [breadcrumbs, setBreadcrumbs] = useState<CrumbItemProps[]>()

  useEffect(() => {
    let tempBreadcrumbs

    if (dynamic) {
      const pathWithoutQuery = pathname.split("?")[0]
      let pathArray = pathWithoutQuery.split("/")
      pathArray.shift()

      pathArray = pathArray.filter((path) => path !== "")

      tempBreadcrumbs = pathArray.map((path, index) => {
        const href = "/" + pathArray.slice(0, index + 1).join("/")
        return {
          path: href,
          label: path,
          isCurrent: index === pathArray.length - 1
        }
      })
    } else {
      tempBreadcrumbs = items
    }

    setBreadcrumbs(tempBreadcrumbs)
  }, [pathname, dynamic, items])

  return (
    <div role="presentation">
      <ol
        className="hide-scrollbar flex items-end overflow-y-auto whitespace-nowrap py-6 pr align-middle text-sm leading-none"
        aria-label="breadcrumb"
      >
        {/* <li className="flex items-end pr align-middle leading-none">
          <Link
            href="/home"
            aria-current={pathname === "/home" ? "page" : "false"}
            legacyBehavior
          >
            <a title={process.env.NEXT_PUBLIC_TITLE} className="text-alpha-600">
              وردست
            </a>
          </Link>
        </li> */}
        {breadcrumbs &&
          breadcrumbs.map((crumb, idx) => (
            <li key={idx} className="flex items-end align-middle leading-none">
              {idx !== breadcrumbs.length && idx > 0 && (
                <span className="mx-1 text-alpha-400">/</span>
              )}
              <Link href={crumb.path} passHref legacyBehavior prefetch={false}>
                <a
                  title={crumb.label}
                  aria-current={crumb.isCurrent ? "page" : "false"}
                  className={
                    idx < breadcrumbs.length - 1
                      ? "text-alpha-600"
                      : "text-primary"
                  }
                >
                  {crumb.label}
                </a>
              </Link>
            </li>
          ))}
      </ol>
    </div>
  )
}

export default Breadcrumb
