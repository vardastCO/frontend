"use client"

import { useState } from "react"
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftEllipsisIcon,
  CubeIcon,
  MapIcon,
  ScaleIcon,
  ShareIcon,
  UserIcon
} from "@heroicons/react/24/outline"
import {
  PhoneIcon,
  TruckIcon,
  UserCircleIcon,
  WalletIcon
} from "@heroicons/react/24/solid"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { useInfiniteQuery } from "@tanstack/react-query"
import clsx from "clsx"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"

import { GetAllProductsQuery, Product, UserStatusesEnum } from "@/generated"

import Link from "@core/components/shared/Link"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import MobileHomeMostSellProducts from "@/app/(public)/(pages)/home/components/MobileHomeMostSellProducts"

const shortIcons = [
  {
    id: 0,
    text: "احراز هویت",
    Icon: ScaleIcon,
    color: "bg-warning-500"
  },
  {
    id: 1,
    text: "مدیریت کیف پول",
    Icon: WalletIcon,
    color: "bg-blue-500"
  },
  {
    id: 2,
    text: "حمل ونقل",
    Icon: TruckIcon,
    color: "bg-success-500"
  },
  {
    id: 3,
    text: "تماس با ما",
    Icon: PhoneIcon,
    color: "bg-red-500"
  }
]

const _actionsIcons = [
  {
    id: 0,
    text: "وضعیت سفارش‌ها",
    Icon: CubeIcon
  },
  {
    id: 1,
    text: "دیدگاه‌ها و نظرات",
    Icon: ChatBubbleLeftEllipsisIcon
  },
  {
    id: 2,
    text: "دعوت از دوستان",
    Icon: ShareIcon
  },
  {
    id: 3,
    text: "آدرس ها",
    Icon: MapIcon
  },
  {
    id: 4,
    text: "اطلاعات حساب کاربری",
    Icon: UserIcon
  }
]

const ProfileIndex = ({ session }: { session: Session | null }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, setLoader] = useState(false)
  const allProductsQuery = useInfiniteQuery<GetAllProductsQuery>(
    [
      QUERY_FUNCTIONS_KEY.ALL_PRODUCTS_QUERY_KEY,
      {
        page: 1
      }
    ],
    ({ pageParam = 1 }) =>
      getAllProductsQueryFn({
        page: pageParam
      }),
    {
      enabled: !!session,
      keepPreviousData: true,
      getNextPageParam(lastPage, allPages) {
        return lastPage.products.currentPage < lastPage.products.lastPage
          ? allPages.length + 1
          : undefined
      }
    }
  )

  return (
    <>
      <div className="flex flex-col gap-y bg-alpha-white px py">
        <div className="flex items-center">
          <div className="flex flex-1 items-center gap-x-2">
            <UserCircleIcon className="h-16 w-16 text-primary" />
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
          {session?.profile.status && (
            <div className={clsx("bg-success-100", "rounded-2xl", "px-2 py-1")}>
              {session?.profile.status === UserStatusesEnum.NotActivated && (
                <p className="text-error">غیر فعال</p>
              )}
              {session?.profile.status === UserStatusesEnum.Active && (
                <p className="text-success">فعال</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 bg-alpha-white px py">
        {shortIcons.map(({ id, Icon, color, text }) => (
          <div key={id} className="flex flex-col items-center gap-y-2">
            <div
              className={clsx(
                "flex flex-col items-center justify-center rounded-full p-5",
                color
              )}
            >
              <Icon className="h-7 w-7 text-alpha-white" />
            </div>
            <p className="text-xs text-alpha">{text}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap gap-y-6 bg-alpha-white px py">
        {_actionsIcons.map(({ Icon, id, text }) => (
          <div key={id} className="flex flex-col items-center gap-y-2">
            <div
              className={clsx(
                "flex flex-col items-center justify-center rounded-full bg-alpha-200 p"
              )}
            >
              <Icon className="h-6 w-6 text-alpha-800" />
            </div>
            <p className="text-xs text-alpha">{text}</p>
          </div>
        ))}
        {session ? (
          <Link
            href={""}
            onClick={() => {
              setLoader(true)
              signOut()
            }}
            className="flex flex-col items-center gap-y-2"
          >
            <div
              className={clsx(
                "flex flex-col items-center justify-center rounded-full bg-alpha-200 p"
              )}
            >
              <ArrowLeftOnRectangleIcon className="h-7 w-7 text-error" />
            </div>
            <p className="text-xs text-error">خروج از حساب کاربری</p>
          </Link>
        ) : (
          <Link
            href="/auth/signin"
            className="flex flex-col items-center gap-y-2"
          >
            <div
              className={clsx(
                "flex flex-col items-center justify-center rounded-full bg-alpha-200 p"
              )}
            >
              <ArrowRightOnRectangleIcon className="h-7 w-7 text-success" />
            </div>
            <p className="text-xs text-success">ورود به حساب کاربری</p>
          </Link>
        )}
      </div>
      <div className="bg-alpha-white py">
        <MobileHomeMostSellProducts
          products={allProductsQuery.data?.pages[0].products.data as Product[]}
        />
      </div>
    </>
  )
}

export default ProfileIndex
