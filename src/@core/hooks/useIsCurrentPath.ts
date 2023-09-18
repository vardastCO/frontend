"use client"

import { usePathname } from "next/navigation"

/**
 * check equality of current path with list of 'pathnames' that you pass. for example: useIsCurrentPath(["profile", "auth"])
 */
const useIsCurrentPath = (pathnames: string[]) => {
  const pathname = usePathname()

  if (pathname.length === 0) {
    return false
  }

  if (pathnames.length > 0) {
    return pathnames.some((path) => path === pathname.split("/")[1])
  }

  return pathname.split("/")[1] === pathname[0]
}

export default useIsCurrentPath
