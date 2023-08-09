import { usePathname, useRouter } from "next/navigation"
import useTranslation from "next-translate/useTranslation"

import { SellerRepresentative } from "@/generated"

import { Avatar, AvatarFallback, AvatarImage } from "@core/components/ui/avatar"
import { useToast } from "@core/hooks/use-toast"

type MembersTabProps = {
  representatives: SellerRepresentative[]
}

const MembersTab = ({ representatives }: MembersTabProps) => {
  const { t } = useTranslation()
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <>
      {representatives && representatives.length > 0 && (
        <div className="card table-responsive rounded">
          <table className="table-hover table">
            <thead>
              <tr>
                <th></th>
                <th>{t("common:role")}</th>
                <th>{t("common:status")}</th>
              </tr>
            </thead>
            <tbody>
              {representatives.map(
                (representative) =>
                  representative && (
                    <tr
                      key={representative.id}
                      onClick={() =>
                        router.push(`/admin/users/${representative.user.uuid}`)
                      }
                    >
                      <td>
                        <Avatar size="small">
                          {representative.user.avatarFile && (
                            <AvatarImage
                              src={
                                representative.user.avatarFile.presignedUrl.url
                              }
                              alt={representative.user.fullName}
                            />
                          )}

                          <AvatarFallback>
                            {representative.user.firstName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="ms-2 font-medium text-gray-800">
                          {representative.user.fullName}
                        </span>
                      </td>
                      <td>{representative.role}</td>
                      <td>
                        {representative.isActive ? (
                          <span className="tag tag-light tag-sm tag-success">
                            {t("common:active")}
                          </span>
                        ) : (
                          <span className="tag tag-light tag-sm tag-gray">
                            {t("common:not_active")}
                          </span>
                        )}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default MembersTab
