import PageHeader from "@core/components/shared/PageHeader"
import useTranslation from "next-translate/useTranslation"

const AttributesIndex = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader title={t("common:attributes_index_title")}></PageHeader>
      <div className="card table-responsive rounded">
        <table className="table-hover table">
          <thead>
            <tr>
              <th>مشخصه</th>
              <th>شناسه</th>
              <th>نوع</th>
              <th>نمایش</th>
              <th>فیلترینگ</th>
              <th>ضروری</th>
            </tr>
          </thead>
          <tbody>
            <tr>
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
    </>
  )
}

export default AttributesIndex
