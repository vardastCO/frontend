"use client"

import { createContext } from "react"
import { atom, PrimitiveAtom } from "jotai"

interface PublicContextType {
  categoriesFilterVisibilityAtom: PrimitiveAtom<boolean>
  sortFilterVisibilityAtom: PrimitiveAtom<boolean>
  filtersVisibilityAtom: PrimitiveAtom<boolean>
}

const categoriesFilterVisibilityAtom = atom<boolean>(false)
const sortFilterVisibilityAtom = atom<boolean>(false)
const filtersVisibilityAtom = atom<boolean>(false)

export const PublicContext = createContext<PublicContextType>({
  categoriesFilterVisibilityAtom,
  sortFilterVisibilityAtom,
  filtersVisibilityAtom
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
        filtersVisibilityAtom
      }}
    >
      {children}
    </PublicContext.Provider>
  )
}

export default PublicProvider
