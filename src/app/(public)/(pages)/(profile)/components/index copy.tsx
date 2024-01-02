"use client"

import { useState } from "react"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"
import { UserCircleIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { LucideInfo } from "lucide-react"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"

import { ThreeStateSupervisionStatuses, UserStatusesEnum } from "@/generated"

import Link from "@core/components/shared/Link"
import { Alert, AlertDescription, AlertTitle } from "@core/components/ui/alert"
import { _profile_items } from "@core/lib/constants"

import ProfileItem from "./ProfileItem"

const ProfileIndex = ({ session }: { session: Session | null }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, setLoader] = useState(false)

  return (
    <>
      <div className="flex flex-1 flex-col gap-y">
        {session && (
          <div className="mt flex flex-col gap-y bg-alpha-white px py">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <UserCircleIcon className="h-11 w-11 text-primary" />
                <span className="truncate font-medium text-alpha-800">
                  {session?.profile.fullName ? session?.profile.fullName : ""}
                  {session?.profile.cellphone && (
                    <span className="truncate font-medium text-alpha-800">
                      {" - "}
                      {session?.profile.cellphone}
                    </span>
                  )}
                </span>
              </div>
              <div
                className={clsx("bg-success-100", "rounded-2xl", "px-2 py-1")}
              >
                {session?.profile.status === UserStatusesEnum.NotActivated && (
                  <p className="text-error">غیر فعال</p>
                )}
                {session?.profile.status === UserStatusesEnum.Active && (
                  <p className="text-success">فعال</p>
                )}
              </div>
            </div>

            {!session?.profile.seller &&
              session?.profile.status === UserStatusesEnum.Active &&
              !session?.profile.roles.some(
                (role) => role?.name === "admin" || role?.name === "seller"
              ) && (
                <div className="flex justify-center">
                  <Link
                    href={"/request-seller"}
                    className="rounded-3xl border px py-2 text-primary"
                  >
                    ثبت نام به عنوان فروشنده
                  </Link>
                </div>
              )}

            {session?.profile.seller &&
              session?.profile.seller.status ===
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

            {session?.profile.seller &&
              session?.profile.seller.status ===
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
        <ul className="flex flex-1 flex-col divide-y divide-alpha-100 bg-alpha-white">
          {_profile_items.map((props) => (
            <ProfileItem key={props.id} {...props} />
          ))}
          {session && (
            <Link
              href={""}
              onClick={() => {
                setLoader(true)
                signOut()
              }}
              className="flex items-center gap-x px-6 py-5 text-error"
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
            push("/auth/signin")
          }}
          loading={loader}
          disabled={loader}
          block
          >
          {session
            ? session?.profile.roles.some(
              (role) => role?.name === "admin"
              )
              ? "ورود به پنل ادمین"
              : "ورود به پنل فروشنده"
              : "ورود / ثبت نام"}
            </Button> */}
      <div className="p">
        {session?.profile.roles.some(
          (role) => role?.name === "admin" || role?.name === "seller"
        ) ? (
          <Link href="/admin" className="btn btn-md btn-primary block">
            {session.profile.roles.some((role) => role?.name === "admin")
              ? "ورود به پنل ادمین"
              : "ورود به پنل فروشنده"}
          </Link>
        ) : (
          !session && (
            <Link href="/auth/signin" className="btn btn-md btn-primary block">
              ورود / ثبت‌نام
            </Link>
          )
        )}
      </div>
    </>
  )
}

export default ProfileIndex
