"use client"

import { useEffect } from "react"
import Image from "next/image"

import { Button } from "@core/components/ui/button"

import sadFace from "@/assets/sad-face.svg"

export default function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center justify-center">
      <div className="leading-relaxed">
        <Image src={sadFace} alt="Something went wrong!" />
        <h1 className="mt-4 font-bold">ببخشید!</h1>
        <h2>خطایی هنگام درست کردن صفحه رخ داده...</h2>
        <Button onClick={() => reset()} className="mt-8">
          تلاش مجدد
        </Button>
      </div>
    </div>
  )
}
