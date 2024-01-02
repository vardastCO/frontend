import Image from "next/image"
import { UserCircleIcon } from "@heroicons/react/24/solid"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import clsx from "clsx"
import { Session } from "next-auth"

import { UserStatusesEnum } from "@/generated"

import Link from "@core/components/shared/Link"
import Search from "@/app/(public)/components/search"

import logoHorizontal from "@/assets/logo-horizontal-v2-persian-light-bg.svg"

type DesktopHeaderProps = {
  session: Session | null
}

export enum ColorEnum {
  // eslint-disable-next-line no-unused-vars
  ERROR = "ERROR",
  // eslint-disable-next-line no-unused-vars
  SUCCESS = "SUCCESS",
  // eslint-disable-next-line no-unused-vars
  BLACK = "BLACK",
  // eslint-disable-next-line no-unused-vars
  WARNING = "WARNING",
  // eslint-disable-next-line no-unused-vars
  ALPHA = "ALPHA",
  // eslint-disable-next-line no-unused-vars
  BLUE = "BLUE",
  // eslint-disable-next-line no-unused-vars
  RED = "RED"
}

export const StatusUserAlternatives = {
  [UserStatusesEnum.NotActivated]: {
    color: ColorEnum.ERROR,
    text: "غیر فعال"
  },
  [UserStatusesEnum.Active]: { color: ColorEnum.SUCCESS, text: "فعال" },
  [UserStatusesEnum.Banned]: { color: ColorEnum.ALPHA, text: "مسدود شده" }
}

export const UserStatusItem = ({
  color,
  text
}: {
  text: string
  color: ColorEnum
}) => {
  return (
    <div
      className={clsx(
        `bg-${color.toLocaleLowerCase()}-100`,
        "rounded-2xl",
        "px-2 py-1"
      )}
    >
      <p className={`text-${color.toLocaleLowerCase()}-600`}>{text}</p>
    </div>
  )
}

const DesktopHeader = ({ session }: DesktopHeaderProps) => {
  return (
    <header className="sticky right-0 top-0 z-30 border-b bg-alpha-white">
      <div className="container mx-auto grid grid-cols-12 items-center gap-x-12 py">
        <Link href="/" className="relative col-span-3 flex h-full items-center">
          <Image
            src={logoHorizontal}
            alt={`وردست`}
            className="w-auto object-contain"
            priority
          />
        </Link>
        <div className="col-span-6 h-full">
          <Search isMobileView={false} />
        </div>
        <div className="col-span-3 flex h-full justify-end">
          {!!session ? (
            <div className="flex flex-col gap-y bg-alpha-white px-6">
              <div className="flex items-center gap-x-4">
                <div className="flex flex-1 items-center gap-x-2">
                  <UserCircleIcon className="h-12 w-12 text-primary" />
                  <div className="flex flex-col gap-y-1">
                    <h4 className="font-semibold">
                      {session?.profile.fullName
                        ? session?.profile.fullName
                        : "نام کاربری"}
                    </h4>
                    <p className="text-sm font-semibold text-alpha-400">
                      {session?.profile.cellphone
                        ? digitsEnToFa(session?.profile.cellphone)
                        : digitsEnToFa("09123456789")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/auth/signin" className="btn btn-primary">
              ورود به حساب کاربری
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default DesktopHeader
