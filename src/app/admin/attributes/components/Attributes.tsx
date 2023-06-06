"use client"

import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/navigation"

const Attributes = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className="card table-responsive rounded">
      <table className="table-hover table">
        <thead>
          <tr>
            <th>{t("common:attribute")}</th>
            <th>{t("common:id")}</th>
            <th>{t("common:type")}</th>
            <th>{t("common:visibility")}</th>
            <th>{t("common:filtering")}</th>
            <th>{t("common:required")}</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={() => router.push("/admin/attributes/123")}>
            <td>
              <span className="font-medium text-gray-800">رنگ</span>
            </td>
            <td>
              <span className="font-mono">color</span>
            </td>
            <td>
              <span>انتخابی</span>
            </td>
            <td>
              <span className="tag tag-dot tag-success tag-sm">
                {t("common:visible")}
              </span>
            </td>
            <td>
              <span className="tag tag-dot tag-success tag-sm">
                {t("common:filterable")}
              </span>
            </td>
            <td>--</td>
          </tr>
          <tr>
            <td>
              <span className="font-medium text-gray-800">اندازه</span>
            </td>
            <td>
              <span className="font-mono">size</span>
            </td>
            <td>
              <span>انتخابی</span>
            </td>
            <td>
              <span className="tag tag-dot tag-gray tag-sm">
                {t("common:hidden")}
              </span>
            </td>
            <td>--</td>
            <td>--</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Attributes
