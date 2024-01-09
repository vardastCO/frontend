/* eslint-disable no-unused-vars */
"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  InformationCircleIcon,
  NewspaperIcon,
  PhoneIcon as PhoneIconOutline,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline"
import { UserCircleIcon } from "@heroicons/react/24/solid"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import clsx from "clsx"
import { LucideInfo } from "lucide-react"
import { Session } from "next-auth"

import { ThreeStateSupervisionStatuses } from "@/generated"

import Link from "@core/components/shared/Link"
import { Alert, AlertDescription, AlertTitle } from "@core/components/ui/alert"
import {
  ColorEnum,
  StatusUserAlternatives,
  UserStatusItem
} from "@/app/(public)/components/desktop/DesktopHeader"

enum ProfileIconVariantStatusEnum {
  ACTIVE_WHITE = ColorEnum.ALPHA,
  ACTIVE_ALPHA = ColorEnum.ALPHA,
  SUCCESS = ColorEnum.SUCCESS,
  ERROR = ColorEnum.ERROR,
  WARNING = ColorEnum.WARNING
}

enum ProfileIconVariantTypeEnum {
  BIG = "BIG",
  SMALL = "SMALL"
}

type HeroIcon = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined
    titleId?: string | undefined
  } & React.RefAttributes<SVGSVGElement>
>

interface IconProps {
  href: string
  Icon: HeroIcon
  color: ColorEnum
  text: string
  disabled?: boolean
  onClick?: (_?: any) => void
}

interface BigSmallIconProps extends IconProps {
  id: number
  status: ProfileIconVariantStatusEnum
}

// const _big_icons: BigSmallIconProps[] = [
//   {
//     id: 0,
//     text: "احراز هویت",
//     href: "",
//     Icon: ScaleIcon,
//     color: ColorEnum.WARNING,
//     status: ProfileIconVariantStatusEnum.ACTIVE_WHITE,
//     disabled: true
//   },
//   {
//     id: 1,
//     text: "مدیریت کیف پول",
//     href: "",
//     Icon: WalletIcon,
//     color: ColorEnum.BLUE,
//     status: ProfileIconVariantStatusEnum.ACTIVE_WHITE,
//     disabled: true
//   },
//   {
//     id: 2,
//     text: "حمل ونقل",
//     href: "",
//     Icon: TruckIcon,
//     color: ColorEnum.RED,
//     status: ProfileIconVariantStatusEnum.ACTIVE_WHITE,
//     disabled: true
//   },
//   {
//     id: 3,
//     text: "تماس با ما",
//     href: "/contact",
//     Icon: PhoneIcon,
//     color: ColorEnum.SUCCESS,
//     status: ProfileIconVariantStatusEnum.ACTIVE_WHITE
//   }
// ]

const _small_icons: BigSmallIconProps[] = [
  {
    id: 0,
    text: "قوانین و مقررات",
    href: "/privacy",
    Icon: NewspaperIcon,
    color: ColorEnum.ALPHA,
    status: ProfileIconVariantStatusEnum.ACTIVE_ALPHA
  },
  {
    id: 1,
    text: "درباره ما",
    href: "/about",
    Icon: InformationCircleIcon,
    color: ColorEnum.ALPHA,
    status: ProfileIconVariantStatusEnum.ACTIVE_ALPHA
  },
  {
    id: 5,
    text: "تماس با ما",
    href: "/contact",
    Icon: PhoneIconOutline,
    color: ColorEnum.ALPHA,
    status: ProfileIconVariantStatusEnum.ACTIVE_ALPHA
  },
  {
    id: 5,
    text: "سوالات متداول",
    href: "/faq",
    Icon: QuestionMarkCircleIcon,
    color: ColorEnum.ALPHA,
    status: ProfileIconVariantStatusEnum.ACTIVE_ALPHA
  }
  // {
  //   id: 2,
  //   text: "دعوت از دوستان",
  //   href: "",
  //   Icon: ShareIcon,
  //   color: ColorEnum.ALPHA,
  //   status: ProfileIconVariantStatusEnum.ACTIVE_ALPHA,
  //   disabled: true
  // },
  // {
  //   id: 3,
  //   text: "آدرس ها",
  //   href: "",
  //   Icon: MapIcon,
  //   color: ColorEnum.ALPHA,
  //   status: ProfileIconVariantStatusEnum.ACTIVE_ALPHA,
  //   disabled: true
  // },
  // {
  //   id: 4,
  //   text: "اطلاعات حساب کاربری",
  //   href: "",
  //   Icon: UserIcon,
  //   color: ColorEnum.ALPHA,
  //   status: ProfileIconVariantStatusEnum.ACTIVE_ALPHA,
  //   disabled: true
  // }
]

interface IProfileIconItem extends IconProps {
  variant: {
    type: ProfileIconVariantTypeEnum
    status: ProfileIconVariantStatusEnum
  }
}

const ProfileIconItem = ({
  color,
  text,
  href,
  Icon,
  variant,
  disabled,
  onClick
}: IProfileIconItem) => {
  return (
    <Link
      onClick={onClick}
      href={href}
      className="flex items-center justify-start gap-x-4"
    >
      <div
        className={clsx(
          "flex flex-col items-center justify-center rounded-full",
          variant.type === ProfileIconVariantTypeEnum.BIG
            ? `bg-${ColorEnum[color].toLocaleLowerCase()}-${
                disabled ? "100" : "600"
              } p-5`
            : `bg-${ColorEnum[color].toLocaleLowerCase()}-${
                disabled ? "200" : "100"
              } p-4`
        )}
      >
        <Icon
          className={clsx(
            variant.type === ProfileIconVariantTypeEnum.BIG
              ? "h-7 w-7 text-alpha-white"
              : `text-${ColorEnum[variant.status].toLocaleLowerCase()}-${
                  disabled ? "400" : "600"
                } h-7 w-7`
          )}
        />
      </div>
      <p
        className={clsx(
          "text-center text-sm font-semibold",
          `text-${ColorEnum[variant.status].toLocaleLowerCase()}-${
            disabled ? "400" : "600"
          }`
        )}
      >
        {text}
      </p>
    </Link>
  )
}

const ProfileIndex = ({ session }: { session: Session | null }) => {
  // eslint-disable-next-line no-unused-vars
  // const allProductsQuery = useInfiniteQuery<GetAllProductsQuery>(
  //   [
  //     QUERY_FUNCTIONS_KEY.ALL_PRODUCTS_QUERY_KEY,
  //     {
  //       page: 1
  //     }
  //   ],
  //   ({ pageParam = 1 }) =>
  //     getAllProductsQueryFn({
  //       page: pageParam
  //     }),
  //   {
  //     enabled: !!session,
  //     keepPreviousData: true,
  //     getNextPageParam(lastPage, allPages) {
  //       return lastPage.products.currentPage < lastPage.products.lastPage
  //         ? allPages.length + 1
  //         : undefined
  //     }
  //   }
  // )

  const productContainerRef = useRef<HTMLAnchorElement>(null)
  const [imageContainerHeight, setImageContainerHeight] = useState(146)

  const _small_logout_icons: BigSmallIconProps[] = [
    {
      id: 6,
      text: "خروج از حساب کاربری",
      href: "/auth/signout",
      Icon: ArrowLeftOnRectangleIcon,
      color: ColorEnum.ERROR,
      status: ProfileIconVariantStatusEnum.ERROR
    }
  ]

  const _small_signin_icons: BigSmallIconProps[] = [
    {
      id: 5,
      text: "ورود به حساب کاربری",
      href: "/auth/signin",
      Icon: ArrowRightOnRectangleIcon,
      color: ColorEnum.SUCCESS,
      status: ProfileIconVariantStatusEnum.SUCCESS
    }
  ]

  useEffect(() => {
    const div = productContainerRef.current
    if (div) {
      setImageContainerHeight(div.children[0].clientWidth / 3)
    }
  }, [])

  return (
    <>
      {session?.profile?.status && (
        <div className="flex flex-col gap-y border-b bg-alpha-white px py">
          <div className="flex items-center pb">
            <div className="flex flex-1 items-center gap-x-2">
              <UserCircleIcon className="h-16 w-16 text-primary" />
              <div className="flex flex-col gap-y-1">
                <h4 className="font-semibold">
                  {session?.profile?.fullName
                    ? session?.profile?.fullName
                    : "نام کاربری"}
                </h4>
                <p className="text-sm font-semibold text-alpha-400">
                  {session?.profile?.cellphone
                    ? digitsEnToFa(session?.profile?.cellphone)
                    : digitsEnToFa("09123456789")}
                </p>
              </div>
            </div>
            <UserStatusItem
              {...StatusUserAlternatives[session?.profile.status]}
            />
          </div>
        </div>
      )}

      {session?.profile.seller ? (
        <>
          {session?.profile.seller.status ===
            ThreeStateSupervisionStatuses.Pending && (
            <div className="bg-alpha-white p">
              <Alert variant="warning">
                <LucideInfo />
                <AlertTitle>اطلاعیه</AlertTitle>
                <AlertDescription>
                  <div className="flex flex-col items-start gap-2">
                    <p>
                      درخواست تبدیل حساب کاربری شما به فروشنده در حال بررسی است
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {session?.profile.seller.status ===
            ThreeStateSupervisionStatuses.Rejected && (
            <div className="bg-alpha-white p">
              <Alert variant="danger">
                <LucideInfo />
                <AlertTitle>اطلاعیه</AlertTitle>
                <AlertDescription>
                  <div className="flex flex-col items-start gap-2">
                    <p>درخواست شما برای تبدیل حساب کاربریان به فروشنده رد شد</p>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </>
      ) : (
        // session?.profile.status === UserStatusesEnum.Active &&
        !session?.profile.roles.some(
          (role) => role?.name === "admin" || role?.name === "seller"
        ) && (
          <div className="border-b bg-alpha-white pb">
            <Link
              href={"/request-seller"}
              ref={productContainerRef}
              className={`relative flex flex-shrink-0 transform flex-col items-center justify-center rounded-xl bg-center bg-no-repeat align-middle transition-all duration-1000 ease-out`}
            >
              <div
                style={{
                  height: imageContainerHeight
                }}
                className="w-full"
              >
                <Image
                  src={"/images/be-seller.png"}
                  alt={"be-seller"}
                  fill
                  className="rounded-xl object-contain"
                />
              </div>
            </Link>
          </div>
        )
      )}
      {/* <div className="grid grid-cols-4 bg-alpha-white px py">
        {_big_icons.map(({ id, status, ...props }) => (
          <ProfileIconItem
            key={id}
            variant={{
              type: ProfileIconVariantTypeEnum.BIG,
              status
            }}
            {...props}
          />
        ))}
      </div> */}
      <div className="flex flex-col items-start justify-start gap-y-6 bg-alpha-white px py">
        {_small_icons
          .concat(session ? _small_logout_icons : _small_signin_icons)
          .map(({ id, status, ...props }) => (
            <ProfileIconItem
              key={id}
              variant={{
                type: ProfileIconVariantTypeEnum.SMALL,
                status
              }}
              {...props}
            />
          ))}
      </div>
      {session?.profile.roles.some(
        (role) => role?.name === "admin" || role?.name === "seller"
      ) && (
        <div className="flex flex-1 flex-col justify-end bg-alpha-white p">
          <Link href="/admin" className="btn btn-md btn-primary block">
            {session.profile.roles.some((role) => role?.name === "admin")
              ? "ورود به پنل ادمین"
              : "ورود به پنل فروشنده"}
          </Link>
        </div>
      )}
      {/* {session && (
        <div className="bg-alpha-white py">
          <MobileHomeSection block={false} title="آخرین خرید های شما">
            <ProductSlider
              products={
                allProductsQuery.data?.pages[0].products.data as Product[]
              }
            />
          </MobileHomeSection>
        </div>
      )} */}
    </>
  )
}

export default ProfileIndex
