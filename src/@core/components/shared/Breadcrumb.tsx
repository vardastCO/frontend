"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconSmartHome } from "@tabler/icons-react"
import useTranslation from "next-translate/useTranslation"

type Props = {}

const Breadcrumb = (props: Props) => {
  const { t } = useTranslation()
  const pathname = usePathname()
  const [breadcrumbs, setBreadcrumbs] = useState<
    {
      href: string
      label: string
      isCurrent: boolean
    }[]
  >()

  useEffect(() => {
    const pathWithoutQuery = pathname.split("?")[0]
    let pathArray = pathWithoutQuery.split("/")
    pathArray.shift()

    pathArray = pathArray.filter((path) => path !== "")

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/")
      return {
        href,
        label: path,
        isCurrent: index === pathArray.length - 1
      }
    })

    setBreadcrumbs(breadcrumbs)
  }, [pathname])

  return (
    <div role="presentation">
      <ol
        className="flex items-end whitespace-nowrap align-middle text-sm leading-none"
        aria-label="breadcrumb"
      >
        <li className="flex items-end align-middle leading-none">
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : "false"}
            legacyBehavior
          >
            <a title={t("common:home").toString()}>
              <IconSmartHome className="h-4 w-4 text-gray-400" />
            </a>
          </Link>
        </li>
        {breadcrumbs &&
          breadcrumbs.map((crumb, idx) => (
            <li key={idx} className="flex items-end align-middle leading-none">
              {idx !== breadcrumbs.length && (
                <span className="mx-1 text-gray-400">/</span>
              )}
              <Link href={crumb.href} passHref legacyBehavior>
                <a
                  title={t(`common:${crumb.label}`).toString()}
                  aria-current={crumb.isCurrent ? "page" : "false"}
                  className="text-gray-600"
                >
                  {t(`common:${crumb.label}`)}
                </a>
              </Link>
            </li>
          ))}
      </ol>
    </div>
  )
}

export default Breadcrumb
