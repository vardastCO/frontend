"use client"

import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/navigation"

const UOMs = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className="card table-responsive rounded">
      <table className="table-hover table">
        <thead>
          <tr>
            <th>{t("common:uom")}</th>
            <th>{t("common:symbol")}</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={() => router.push("/admin/uoms/123")}>
            <td>
              <span className="font-medium text-gray-800">متر</span>
            </td>
            <td>
              <span className="font-medium text-gray-800">m</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default UOMs
