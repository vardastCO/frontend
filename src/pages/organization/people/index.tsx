import DashboardLayout from "@/@core/layouts/DashboardLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { IconDots } from "@tabler/icons-react"
import { formatDistanceToNow } from "date-fns"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"
import Image from "next/image"
import { ReactElement } from "react"

const OranizationManagePeoplePage: NextPageWithLayout = () => {
  const { t } = useTranslation("common")
  const people = [
    {
      avatar: "https://api.dicebear.com/5.x/big-ears-neutral/svg?seed=Music",
      name: "محسن محمدی",
      role: "رئیس",
      email: "mohsen@ndp.ir",
      lastActivity: 1677869179000
    },
    {
      avatar:
        "https://api.dicebear.com/5.x/big-ears-neutral/svg?seed=Convertible",
      name: "علیرضا سرابچی",
      role: "توسعه دهنده",
      email: "alireza@ndp.ir",
      lastActivity: 1677968922000
    },
    {
      avatar: "https://api.dicebear.com/5.x/big-ears-neutral/svg?seed=vortals",
      name: "محمدرسول فکری",
      role: "توسعه دهنده",
      email: "rasool@ndp.ir",
      lastActivity: 1677934541000
    },
    {
      avatar: "https://api.dicebear.com/5.x/big-ears-neutral/svg?seed=schemas",
      name: "انسان برتر",
      role: "پروردگار",
      email: "god@universe.com",
      lastActivity: 1677935185000
    }
  ]
  return (
    <>
      <NextSeo title={t("Manage People").toString()} />
      <div className="flex h-auto flex-1 flex-col">
        <h1 className="mb-8 text-3xl font-black text-gray-800">
          {t("Manage People")}
        </h1>

        <div className="card rounded">
          <table className="my-8 table">
            <thead>
              <tr>
                <th></th>
                <th>ایمیل</th>
                <th>آخرین فعالیت</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {people.map((person, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar avatar-sm relative">
                        <Image src={person.avatar} alt={person.name} fill />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-700">
                          {person.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {person.role}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="font-sans">{person.email}</span>
                  </td>
                  <td>
                    <span>
                      {digitsEnToFa(
                        formatDistanceToNow(person.lastActivity, {
                          addSuffix: true
                        })
                      )}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-secondary btn-xs">
                      <IconDots className="icon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

OranizationManagePeoplePage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default OranizationManagePeoplePage
