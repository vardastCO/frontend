"use client"

import { createContext } from "react"
import { atom, PrimitiveAtom } from "jotai"

interface PublicContextType {
  globalCategoriesFilterVisibilityAtom: PrimitiveAtom<boolean>
  sortFilterVisibilityAtom: PrimitiveAtom<boolean>
  filtersVisibilityAtom: PrimitiveAtom<boolean>
  currentPageAtom: PrimitiveAtom<number>
}

const globalCategoriesFilterVisibilityAtom = atom<boolean>(false)
const sortFilterVisibilityAtom = atom<boolean>(false)
const filtersVisibilityAtom = atom<boolean>(false)
const currentPageAtom = atom<number>(1)

export const PublicContext = createContext<PublicContextType>({
  globalCategoriesFilterVisibilityAtom,
  sortFilterVisibilityAtom,
  filtersVisibilityAtom,
  currentPageAtom
})

type PublicProviderProps = {
  children: React.ReactNode
}

const PublicProvider = ({ children }: PublicProviderProps) => {
  return (
    <PublicContext.Provider
      value={{
        globalCategoriesFilterVisibilityAtom,
        sortFilterVisibilityAtom,
        filtersVisibilityAtom,
        currentPageAtom
      }}
    >
      {children}
    </PublicContext.Provider>
  )
}

export default PublicProvider
