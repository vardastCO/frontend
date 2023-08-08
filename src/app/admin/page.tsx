import type { Metadata } from "next"
import { LucideInfo } from "lucide-react"
import { getServerSession } from "next-auth"

import { ThreeStateSupervisionStatuses } from "@/generated"

import { Alert, AlertDescription, AlertTitle } from "@core/components/ui/alert"
import { authOptions } from "@core/lib/authOptions"
import BecomeSellerAlert from "@/app/admin/components/BecomeSellerAlert"

export const metadata: Metadata = {
  title: "وردست من"
}

const AdminIndex = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div>
      {!session?.profile.seller &&
        !session?.profile.roles.some(
          (role) => role?.name === "admin" || role?.name === "seller"
        ) && <BecomeSellerAlert />}

      {session?.profile.seller &&
        session?.profile.seller.status ===
          ThreeStateSupervisionStatuses.Pending && (
          <Alert variant="warning">
            <LucideInfo />
            <AlertTitle>اطلاعیه</AlertTitle>
            <AlertDescription>
              <div className="flex flex-col items-start gap-2">
                <p>درخواست تبدیل حساب کاربری شما به فروشنده در حال بررسی است</p>
              </div>
            </AlertDescription>
          </Alert>
        )}

      {session?.profile.seller &&
        session?.profile.seller.status ===
          ThreeStateSupervisionStatuses.Rejected && (
          <Alert variant="danger">
            <LucideInfo />
            <AlertTitle>اطلاعیه</AlertTitle>
            <AlertDescription>
              <div className="flex flex-col items-start gap-2">
                <p>درخواست شما برای تبدیل حساب کاربریان به فروشنده رد شد</p>
              </div>
            </AlertDescription>
          </Alert>
        )}
    </div>
  )
}

export default AdminIndex
