"use client"

import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react"
import { usePathname, useSearchParams } from "next/navigation"

/** Types */
type RouteChangeContextProps = {
  routeChangeStartCallbacks: Function[]
  routeChangeCompleteCallbacks: Function[]
  onRouteChangeStart: () => void
  onRouteChangeComplete: () => void
}

type RouteChangeProviderProps = {
  children: React.ReactNode
}

/** Logic */

const RouteChangeContext = createContext<RouteChangeContextProps>(
  {} as RouteChangeContextProps
)

export const useRouteChangeContext = () => useContext(RouteChangeContext)

function RouteChangeComplete() {
  const { onRouteChangeComplete } = useRouteChangeContext()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onRouteChangeComplete(), [pathname, searchParams])

  return null
}

export const RouteChangeProvider: React.FC<RouteChangeProviderProps> = ({
  children
}: RouteChangeProviderProps) => {
  const [routeChangeStartCallbacks] = useState<Function[]>([])
  const [routeChangeCompleteCallbacks] = useState<Function[]>([])

  const onRouteChangeStart = useCallback(() => {
    routeChangeStartCallbacks.forEach((callback) => callback())
  }, [routeChangeStartCallbacks])

  const onRouteChangeComplete = useCallback(() => {
    routeChangeCompleteCallbacks.forEach((callback) => callback())
  }, [routeChangeCompleteCallbacks])

  return (
    <RouteChangeContext.Provider
      value={{
        routeChangeStartCallbacks,
        routeChangeCompleteCallbacks,
        onRouteChangeStart,
        onRouteChangeComplete
      }}
    >
      {children}
      <Suspense>
        <RouteChangeComplete />
      </Suspense>
    </RouteChangeContext.Provider>
  )
}
