"use client"

import { createContext } from "react"
import { atom, PrimitiveAtom, useAtom } from "jotai"

import MobileCategoriesFilter from "@/app/(public)/components/mobile-categories-filter"

interface PublicContextType {
  categoriesFilterVisibilityAtom: PrimitiveAtom<boolean>
}

const categoriesFilterVisibilityAtom = atom<boolean>(false)

export const PublicContext = createContext<PublicContextType>({
  categoriesFilterVisibilityAtom
})

type Props = {
  children: React.ReactNode
}

export default function PublicProvider({ children }: Props) {
  const [categoriesFilterState, setCategoriesFilterState] = useAtom(
    categoriesFilterVisibilityAtom
  )
  return (
    <PublicContext.Provider
      value={{
        categoriesFilterVisibilityAtom
      }}
    >
      <MobileCategoriesFilter />
      {children}
    </PublicContext.Provider>
  )
}
