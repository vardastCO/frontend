"use client"

import { useState } from "react"
import Image from "next/image"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import clsx from "clsx"

import CardAvatar from "@core/components/shared/CardAvatar"
import Link from "@core/components/shared/Link"
import { ICategoryListLoader } from "@/app/(public)/(pages)/categories/components/CategoryListLoader"

export type SliderItemProps = {
  data: {
    id: number
    imageUrl?: string
    avatarUrl?: string
    name: string
    href: string
    total: any
  }
  width: number
  autoWidth?: boolean
}

const BigSliderItem = ({ data, width, autoWidth }: SliderItemProps) => {
  const [selectedItemId, setSelectedItemId] =
    useState<ICategoryListLoader>(null)

  return (
    <Link
      onClick={() => {
        setSelectedItemId(data.id)
      }}
      className={clsx(
        "flex h-full flex-col justify-between overflow-hidden rounded-2xl border bg-alpha-white shadow-lg",
        selectedItemId === data.id
          ? "border-2 border-primary"
          : "border-alpha-50"
      )}
      href={data.href}
      style={{
        width: autoWidth ? "auto" : width
      }}
    >
      <div
        style={{
          height: (width * 6) / 5
        }}
        className={clsx("relative")}
      >
        <Image
          src={data.imageUrl ?? ""}
          alt="category"
          fill
          className="h-full w-full object-fill"
        />
      </div>
      <div className="relative z-20 flex items-center justify-between bg-alpha-50 bg-opacity-60 px py-4 text-center font-semibold">
        <CardAvatar url={data.avatarUrl ?? ""} name={data.name} />
        <h5 className="text-primary">
          {data.total ? `${digitsEnToFa(data.total)} کالا` : ""}
        </h5>
      </div>
    </Link>
  )
}

export default BigSliderItem
