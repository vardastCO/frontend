"use client"

import { createContext } from "react"
import { atom, PrimitiveAtom, useAtom } from "jotai"

import MobileCategories from "@/app/(public)/components/mobile-categories"

interface PublicContextType {
  categoriesFilterStateAtom: PrimitiveAtom<boolean>
}

const categoriesFilterStateAtom = atom<boolean>(false)

export const PublicContext = createContext<PublicContextType>({
  categoriesFilterStateAtom
})

type Props = {
  children: React.ReactNode
}

export default function PublicProvider({ children }: Props) {
  const [categoriesFilterState, setCategoriesFilterState] = useAtom(
    categoriesFilterStateAtom
  )
  return (
    <PublicContext.Provider
      value={{
        categoriesFilterStateAtom
      }}
    >
      <MobileCategories />
      {children}
    </PublicContext.Provider>
  )
}
