"use client"

import { createContext } from "react"
import { atom, PrimitiveAtom } from "jotai"

interface PublicContextType {
  categoriesFilterVisibilityAtom: PrimitiveAtom<boolean>
  globalCategoriesFilterVisibilityAtom: PrimitiveAtom<boolean>
  globalSearchModalAtom: PrimitiveAtom<boolean>
  sortFilterVisibilityAtom: PrimitiveAtom<boolean>
  filtersVisibilityAtom: PrimitiveAtom<boolean>
  mySpaceVisibilityAtom: PrimitiveAtom<boolean>
  currentPageAtom: PrimitiveAtom<number>
}

const categoriesFilterVisibilityAtom = atom<boolean>(false)
const globalCategoriesFilterVisibilityAtom = atom<boolean>(false)
const globalSearchModalAtom = atom<boolean>(false)
const sortFilterVisibilityAtom = atom<boolean>(false)
const filtersVisibilityAtom = atom<boolean>(false)
const mySpaceVisibilityAtom = atom<boolean>(false)
const currentPageAtom = atom<number>(1)

export const PublicContext = createContext<PublicContextType>({
  categoriesFilterVisibilityAtom,
  globalCategoriesFilterVisibilityAtom,
  globalSearchModalAtom,
  sortFilterVisibilityAtom,
  filtersVisibilityAtom,
  mySpaceVisibilityAtom,
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
        globalCategoriesFilterVisibilityAtom,
        globalSearchModalAtom,
        sortFilterVisibilityAtom,
        filtersVisibilityAtom,
        mySpaceVisibilityAtom,
        currentPageAtom
      }}
    >
      {children}
    </PublicContext.Provider>
  )
}

export default PublicProvider
