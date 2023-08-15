import { digitsEnToFa } from "@persian-tools/persian-tools"
import { formatDistanceToNow, setDefaultOptions } from "date-fns"
import { faIR } from "date-fns/locale"
import useTranslation from "next-translate/useTranslation"

import { Session } from "@/generated"

type UserSessionsTabProps = {
  sessions: Session[]
}
setDefaultOptions({
  locale: faIR,
  weekStartsOn: 6
})

const UserSessionsTab = ({ sessions }: UserSessionsTabProps) => {
  const { t } = useTranslation()
  return (
    <div>
      <div className="card table-responsive rounded">
        <table className="table-hover table">
          <thead>
            <tr>
              <th>{t("common:last_activity")}</th>
              <th>{t("common:last_active_ip")}</th>
              <th>{t("common:agent")}</th>
              <th>{t("common:created_at")}</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(
              (session) =>
                session && (
                  <tr key={session.id}>
                    <td>
                      {digitsEnToFa(
                        formatDistanceToNow(
                          new Date(session.lastActivityAt).getTime(),
                          {
                            addSuffix: true
                          }
                        )
                      )}
                    </td>
                    <td>{session.lastActiveIp}</td>
                    <td>{session.agent}</td>
                    <td>
                      {digitsEnToFa(
                        formatDistanceToNow(
                          new Date(session.createdAt).getTime(),
                          {
                            addSuffix: true
                          }
                        )
                      )}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserSessionsTab
