"use client"

import { createContext } from "react"
import { atom, PrimitiveAtom } from "jotai"

import MobileCategoriesFilter from "@/app/(public)/components/mobile-categories-filter"
import MobileSortFilter from "@/app/(public)/components/mobile-sort-filter"

interface PublicContextType {
  categoriesFilterVisibilityAtom: PrimitiveAtom<boolean>
  sortFilterVisibilityAtom: PrimitiveAtom<boolean>
}

const categoriesFilterVisibilityAtom = atom<boolean>(false)
const sortFilterVisibilityAtom = atom<boolean>(false)

export const PublicContext = createContext<PublicContextType>({
  categoriesFilterVisibilityAtom,
  sortFilterVisibilityAtom
})

type Props = {
  children: React.ReactNode
}

export default function PublicProvider({ children }: Props) {
  return (
    <PublicContext.Provider
      value={{
        categoriesFilterVisibilityAtom,
        sortFilterVisibilityAtom
      }}
    >
      <MobileCategoriesFilter />
      <MobileSortFilter />
      {children}
    </PublicContext.Provider>
  )
}
