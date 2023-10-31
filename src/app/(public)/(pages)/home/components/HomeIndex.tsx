"use client"

import Image from "next/image"
import Link from "next/link"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { useQuery } from "@tanstack/react-query"

import { GetAllBrandsCountQuery, GetAllSellersCountQuery } from "@/generated"

import { getAllBrandsCountQueryFn } from "@core/queryFns/allBrandsCountQueryFns"
import { getAllSellersCountQueryFn } from "@core/queryFns/allSellersCountQueryFns"
import Search from "@/app/(public)/components/search"

import logoHorizontal from "@/assets/logo-horizontal-v1-persian-light-bg.svg"

const HomeIndex = ({ isMobileView }: { isMobileView: boolean }) => {
  const allBrandsCount = useQuery<GetAllBrandsCountQuery>(
    ["brands-count"],
    getAllBrandsCountQueryFn,
    {
      keepPreviousData: true,
      staleTime: 999999999
    }
  )
  const allSellersCount = useQuery<GetAllSellersCountQuery>(
    ["sellers-count"],
    getAllSellersCountQueryFn,
    {
      keepPreviousData: true,
      staleTime: 999999999
    }
  )
  return (
    <>
      <div
        className="flex h-full flex-col items-center justify-start 
      md:justify-center"
      >
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
        <div className="flex w-full flex-col gap-y md:grid md:flex-1 md:grid-cols-2 md:items-center md:justify-center md:gap">
          <Link
            className="relative w-full overflow-hidden rounded-2xl"
            href="/brands"
          >
            <Image
              width={16000}
              height={9000}
              src={"/images/brands.png"}
              alt={`brands`}
              className="w-full"
              priority
            />
            <span className="absolute bottom-0 left-1/4 text-white">
              {digitsEnToFa(allBrandsCount.data?.brands.total || 0)}
            </span>
          </Link>
          <Link
            className="relative w-full overflow-hidden rounded-2xl"
            href="/sellers"
          >
            <Image
              width={16000}
              height={9000}
              src={"/images/sellers.png"}
              alt={`sellers`}
              className="w-full"
              priority
            />
            <span className="absolute bottom-0 left-1/4 text-white">
              {digitsEnToFa(allSellersCount.data?.sellers.total || 0)}
            </span>
          </Link>
        </div>
      </div>
      {!isMobileView && (
        <div className="fixed inset-x-0 bottom-0 mx-auto mb-12 flex w-full justify-center gap-4 text-center text-sm text-alpha-500">
          <Link href="/about">درباره وردست</Link>
          <Link href="/contact">تماس با ما</Link>
        </div>
      )}
    </>
  )
}

export default HomeIndex
