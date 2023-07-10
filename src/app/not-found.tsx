import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@core/components/ui/button"

export default function NotFound() {
  const router = useRouter()
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div>
        <h2 className="font-bold text-gray-800">همم!</h2>
        <p className="text-gray-700">صفحه مورد نظر شما پیدا نشد</p>
        <div className="mt-8 flex flex-col gap-6">
          <Button
            noStyle
            onClick={() => router.back()}
            className="inline-block text-sm text-brand-500"
          >
            <span>→</span>
            <span>برگشتن به صفحه قبل</span>
          </Button>
          <Link href="/" className="inline-block text-sm text-brand-500">
            <span>خانه</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
