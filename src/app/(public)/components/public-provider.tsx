"use client"

import { createContext } from "react"
import { atom, PrimitiveAtom } from "jotai"

interface PublicContextType {
  categoriesFilterVisibilityAtom: PrimitiveAtom<boolean>
  sortFilterVisibilityAtom: PrimitiveAtom<boolean>
  filtersVisibilityAtom: PrimitiveAtom<boolean>
  currentPageAtom: PrimitiveAtom<number>
}

const categoriesFilterVisibilityAtom = atom<boolean>(false)
const sortFilterVisibilityAtom = atom<boolean>(false)
const filtersVisibilityAtom = atom<boolean>(false)
const currentPageAtom = atom<number>(1)

export const PublicContext = createContext<PublicContextType>({
  categoriesFilterVisibilityAtom,
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
        categoriesFilterVisibilityAtom,
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
