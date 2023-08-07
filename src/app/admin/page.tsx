import type { Metadata } from "next"
import { getServerSession } from "next-auth"

import { authOptions } from "@core/lib/authOptions"
import BecomeSellerAlert from "@/app/admin/components/BecomeSellerAlert"

export const metadata: Metadata = {
  title: "وردست من"
}

const AdminIndex = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div>
      {!session?.profile.roles.some(
        (role) => role?.name === "admin" || role?.name === "seller"
      ) && <BecomeSellerAlert />}
    </div>
  )
}

export default AdminIndex
