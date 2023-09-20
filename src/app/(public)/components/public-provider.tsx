"use client"

import { createContext } from "react"
import { atom, PrimitiveAtom } from "jotai"

interface PublicContextType {
  categoriesFilterVisibilityAtom: PrimitiveAtom<boolean>
  globalCategoriesFilterVisibilityAtom: PrimitiveAtom<boolean>
  sortFilterVisibilityAtom: PrimitiveAtom<boolean>
  filtersVisibilityAtom: PrimitiveAtom<boolean>
  mySpaceVisibilityAtom: PrimitiveAtom<boolean>
  currentPageAtom: PrimitiveAtom<number>
  showNavigationBackButton: PrimitiveAtom<boolean>
}

const categoriesFilterVisibilityAtom = atom<boolean>(false)
const globalCategoriesFilterVisibilityAtom = atom<boolean>(false)
const sortFilterVisibilityAtom = atom<boolean>(false)
const filtersVisibilityAtom = atom<boolean>(false)
const mySpaceVisibilityAtom = atom<boolean>(false)
const currentPageAtom = atom<number>(1)
const showNavigationBackButton = atom<boolean>(false)

export const PublicContext = createContext<PublicContextType>({
  categoriesFilterVisibilityAtom,
  globalCategoriesFilterVisibilityAtom,
  sortFilterVisibilityAtom,
  filtersVisibilityAtom,
  mySpaceVisibilityAtom,
  currentPageAtom,
  showNavigationBackButton
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
        sortFilterVisibilityAtom,
        filtersVisibilityAtom,
        mySpaceVisibilityAtom,
        currentPageAtom,
        showNavigationBackButton
      }}
    >
      {children}
    </PublicContext.Provider>
  )
}

export default PublicProvider
