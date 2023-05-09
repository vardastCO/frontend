import { IconSmartHome } from "@tabler/icons-react"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

type Props = {}

const Breadcrumb = (props: Props) => {
  const { t } = useTranslation("common")
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState<
    {
      href: string
      label: string
      isCurrent: boolean
    }[]
  >()

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0]
    let pathArray = pathWithoutQuery.split("/")
    pathArray.shift()

    pathArray = pathArray.filter((path) => path !== "")

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/")
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
        isCurrent: index === pathArray.length - 1
      }
    })

    setBreadcrumbs(breadcrumbs)
  }, [router.asPath])

  return (
    <div role="presentation">
      <ol
        className="flex items-end align-middle text-sm leading-none"
        aria-label="breadcrumb"
      >
        <li className="flex items-end align-middle leading-none">
          <Link
            href="/"
            aria-current={router.pathname === "/" ? "page" : "false"}
            legacyBehavior
          >
            <a title={t("Home").toString()}>
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
                  title={t(crumb.label).toString()}
                  aria-current={crumb.isCurrent ? "page" : "false"}
                  className="text-gray-600"
                >
                  {t(crumb.label)}
                </a>
              </Link>
            </li>
          ))}
      </ol>
    </div>
  )
}

export default Breadcrumb
