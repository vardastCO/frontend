"use client"

import { createContext } from "react"
import { atom, PrimitiveAtom } from "jotai"

interface PublicContextType {
  categoriesFilterVisibilityAtom: PrimitiveAtom<boolean>
  globalSearchModalAtom: PrimitiveAtom<boolean>
  sortFilterVisibilityAtom: PrimitiveAtom<boolean>
  filtersVisibilityAtom: PrimitiveAtom<boolean>
  showNavbar: PrimitiveAtom<boolean>
  navigationHeight: PrimitiveAtom<number>
}

const categoriesFilterVisibilityAtom = atom<boolean>(false)
const globalSearchModalAtom = atom<boolean>(false)
const sortFilterVisibilityAtom = atom<boolean>(false)
const filtersVisibilityAtom = atom<boolean>(false)
const showNavbar = atom<boolean>(true)
const navigationHeight = atom<number>(0)

export const PublicContext = createContext<PublicContextType>({
  categoriesFilterVisibilityAtom,
  globalSearchModalAtom,
  sortFilterVisibilityAtom,
  filtersVisibilityAtom,
  navigationHeight,
  showNavbar
})

type PublicProviderProps = {
  children: React.ReactNode
}

const PublicProvider = ({ children }: PublicProviderProps) => {
  return (
    <PublicContext.Provider
      value={{
        categoriesFilterVisibilityAtom,
        globalSearchModalAtom,
        sortFilterVisibilityAtom,
        filtersVisibilityAtom,
        navigationHeight,
        showNavbar
      }}
    >
      {children}
    </PublicContext.Provider>
  )
}

export default PublicProvider
