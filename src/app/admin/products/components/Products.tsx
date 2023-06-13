"use client"

import useTranslation from "next-translate/useTranslation"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Products = () => {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <div className="card table-responsive rounded">
      <table className="table-hover table">
        <thead>
          <tr>
            <th></th>
            <th>{t("common:product")}</th>
            <th>{t("common:status")}</th>
            <th>{t("common:updated")}</th>
            <th>{t("common:stock")}</th>
            <th>{t("common:price")}</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={() => router.push("/admin/products/123")}>
            <td>
              <div className="relative aspect-square h-12 w-12 overflow-hidden rounded">
                <Image
                  src="https://api.dicebear.com/5.x/big-ears-neutral/svg?seed="
                  alt="..."
                  fill
                />
              </div>
            </td>
            <td>
              <span className="font-medium text-gray-800">محصول شماره یک</span>
            </td>
            <td>
              <span className="tag tag-dot tag-success">
                {t("common:active")}
              </span>
            </td>
            <td>
              <span>۱۳ مهر</span>
            </td>
            <td>
              <span>۱۲</span>
            </td>
            <td>
              <span>۱۲،۰۰۰ ریال</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Products
