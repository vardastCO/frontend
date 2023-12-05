"use client"

import Image from "next/image"
import { Session } from "next-auth"

import Link from "@core/components/shared/Link"
import FrontPageHeader from "@/app/(public)/components/front-page-header"
import Search from "@/app/(public)/components/search"

import logoHorizontal from "@/assets/logo-horizontal-v1-persian-light-bg.svg"

const DesktopHomeIndex = ({
  isMobileView,
  session
}: {
  session: Session | null
  isMobileView: boolean
}) => {
  // const allBrandsCount = useQuery<GetAllBrandsCountQuery>(
  //   ["brands-count"],
  //   getAllBrandsCountQueryFn,
  //   {
  //     keepPreviousData: true,
  //     staleTime: 999999999
  //   }
  // )
  // const allSellersCount = useQuery<GetAllSellersCountQuery>(
  //   ["sellers-count"],
  //   getAllSellersCountQueryFn,
  //   {
  //     keepPreviousData: true,
  //     staleTime: 999999999
  //   }
  // )
  return (
    <>
      {!isMobileView && <FrontPageHeader session={session} />}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="relative my-8 h-20">
          <Image
            src={logoHorizontal}
            alt={`${process.env.NEXT_PUBLIC_TITLE} - ${process.env.NEXT_PUBLIC_SLOGAN}`}
            className="h-20 w-auto object-contain"
            priority
          />
        </div>
        {!isMobileView && (
          <div className="w-full px">
            <Search isMobileView={isMobileView} />
          </div>
        )}
      </div>
      <div className="fixed inset-x-0 bottom-0 mx-auto mb-12 flex w-full justify-center gap-4 text-center text-sm text-alpha-500">
        <Link href="/about">درباره وردست</Link>
        <Link href="/contact">تماس با ما</Link>
      </div>
    </>
  )
}

export default DesktopHomeIndex
