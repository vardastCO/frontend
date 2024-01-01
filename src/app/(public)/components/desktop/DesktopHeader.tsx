import Image from "next/image"

import Link from "@core/components/shared/Link"
import Search from "@/app/(public)/components/search"

import logoHorizontal from "@/assets/logo-horizontal-v2-persian-light-bg.svg"

type DesktopHeaderProps = {}

const DesktopHeader = (_: DesktopHeaderProps) => (
  <header className="grid h-12 grid-cols-12 items-center gap-x-12">
    <div className="relative col-span-3 h-full">
      <Image
        src={logoHorizontal}
        alt={`${process.env.NEXT_PUBLIC_TITLE} - ${process.env.NEXT_PUBLIC_SLOGAN}`}
        className="w-auto object-contain"
        priority
      />
    </div>
    <div className="col-span-6 h-full">
      <Search isMobileView={false} />
    </div>
    <div className="col-span-3 flex h-full justify-end">
      <Link href="/auth/signin" className="btn btn-primary">
        حساب کاربری
      </Link>
    </div>
  </header>
)

export default DesktopHeader
