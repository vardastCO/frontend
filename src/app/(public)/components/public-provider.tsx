"use client"

import { createContext } from "react"
import { atom, PrimitiveAtom } from "jotai"

import MobileCategoriesFilter from "@/app/(public)/components/mobile-categories-filter"
import MobileFilters from "@/app/(public)/components/mobile-filters"
import MobileSortFilter from "@/app/(public)/components/mobile-sort-filter"

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

type Props = {
  children: React.ReactNode
}

export default function PublicProvider({ children }: Props) {
  return (
    <PublicContext.Provider
      value={{
        categoriesFilterVisibilityAtom,
        sortFilterVisibilityAtom,
        filtersVisibilityAtom
      }}
    >
      <MobileCategoriesFilter />
      <MobileSortFilter />
      <MobileFilters />
      {children}
    </PublicContext.Provider>
  )
}
