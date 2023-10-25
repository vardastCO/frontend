"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"
import { UserCircleIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { LucideInfo } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import { ThreeStateSupervisionStatuses, UserStatusesEnum } from "@/generated"

import { Alert, AlertDescription, AlertTitle } from "@core/components/ui/alert"
import { _profile_items } from "@core/lib/constants"

import ProfileItem from "./ProfileItem"

const ProfileIndex = () => {
  const { push, refresh } = useRouter()
  const pathname = usePathname()
  const [loader, setLoader] = useState(false)
  const session = useSession()

  useEffect(() => {
    session.update()
  }, [pathname])

  return (
    <div className="flex flex-1 flex-col bg-alpha-100 pt">
      <div className="flex flex-1 flex-col gap-y">
        {session.data && (
          <div className="mt flex flex-col gap-y bg-alpha-white px py">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <UserCircleIcon className="h-11 w-11 text-primary" />
                <span className="truncate font-medium text-alpha-800">
                  {session.data?.profile.fullName
                    ? session.data?.profile.fullName
                    : ""}
                  {session.data?.profile.cellphone && (
                    <span className="truncate font-medium text-alpha-800">
                      {" - "}
                      {session.data?.profile.cellphone}
                    </span>
                  )}
                </span>
              </div>
              <div
                className={clsx("bg-success-100", "rounded-2xl", "px-2 py-1")}
              >
                {session?.data?.profile.status ===
                  UserStatusesEnum.NotActivated && (
                  <p className="text-error">غیر فعال</p>
                )}
                {session?.data?.profile.status === UserStatusesEnum.Active && (
                  <p className="text-success">فعال</p>
                )}
              </div>
            </div>

            {!session?.data?.profile.seller &&
              session?.data?.profile.status === UserStatusesEnum.Active &&
              !session?.data?.profile.roles.some(
                (role) => role?.name === "admin" || role?.name === "seller"
              ) && (
                <div className="flex justify-center">
                  <Link
                    href={"/profile/request-seller"}
                    className="rounded-3xl border px py-2 text-primary"
                  >
                    ثبت نام به عنوان فروشنده
                  </Link>
                </div>
              )}

            {session?.data?.profile.seller &&
              session?.data?.profile.seller.status ===
                ThreeStateSupervisionStatuses.Pending && (
                <Alert variant="warning">
                  <LucideInfo />
                  <AlertTitle>اطلاعیه</AlertTitle>
                  <AlertDescription>
                    <div className="flex flex-col items-start gap-2">
                      <p>
                        درخواست تبدیل حساب کاربری شما به فروشنده در حال بررسی
                        است
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

            {session?.data?.profile.seller &&
              session?.data?.profile.seller.status ===
                ThreeStateSupervisionStatuses.Rejected && (
                <Alert variant="danger">
                  <LucideInfo />
                  <AlertTitle>اطلاعیه</AlertTitle>
                  <AlertDescription>
                    <div className="flex flex-col items-start gap-2">
                      <p>
                        درخواست شما برای تبدیل حساب کاربریان به فروشنده رد شد
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
          </div>
        )}
        <ul className="flex flex-1 flex-col bg-alpha-white">
          {_profile_items.map((props) => (
            <ProfileItem key={props.id} {...props} />
          ))}
          {session.data && (
            <Link
              href={""}
              onClick={() => {
                setLoader(true)
                signOut()
              }}
              className="flex items-center gap-x p-6 text-error"
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6" />
              خروج از حساب کاربری
            </Link>
          )}
        </ul>
      </div>
      {/* <Button
          onClick={() => {
            setLoader(true)
            refresh()
            push("/profile/auth/signin")
          }}
          loading={loader}
          disabled={loader}
          block
          >
          {session?.data
            ? session?.data?.profile.roles.some(
              (role) => role?.name === "admin"
              )
              ? "ورود به پنل ادمین"
              : "ورود به پنل فروشنده"
              : "ورود / ثبت نام"}
            </Button> */}
      <div className="p">
        {session.data?.profile.roles.some(
          (role) => role?.name === "admin" || role?.name === "seller"
        ) ? (
          <Link href="/admin" className="btn btn-md btn-primary block">
            {session.data.profile.roles.some((role) => role?.name === "admin")
              ? "ورود به پنل ادمین"
              : "ورود به پنل فروشنده"}
          </Link>
        ) : (
          !session.data && (
            <Link
              href="/profile/auth/signin"
              className="btn btn-md btn-primary block"
            >
              ورود / ثبت‌نام
            </Link>
          )
        )}
      </div>
    </div>
  )
}

export default ProfileIndex
