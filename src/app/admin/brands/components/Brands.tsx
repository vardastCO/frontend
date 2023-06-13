"use client"

import useTranslation from "next-translate/useTranslation"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Brands = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className="card table-responsive rounded">
      <table className="table-hover table">
        <thead>
          <tr>
            <th></th>
            <th>{t("common:brand")}</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={() => router.push("/admin/brands/123")}>
            <td>
              <div className="relative aspect-square h-12 w-12 overflow-hidden rounded">
                <Image src="https://api.dicebear.com/5.x/big-ears-neutral/svg?seed=" alt="..." fill />
              </div>
            </td>
            <td>
              <span className="font-medium text-gray-800">دات</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Brands
