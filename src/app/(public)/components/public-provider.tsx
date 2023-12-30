"use client"

import { createContext } from "react"
import { atom, PrimitiveAtom } from "jotai"

import { EventTrackerTypes } from "@/generated"

import {
  BrandQuery,
  SellerQuery
} from "@/app/(public)/components/BrandOrSellerProfile"

interface PublicContextType {
  categoriesFilterVisibilityAtom: PrimitiveAtom<boolean>
  globalSearchModalAtom: PrimitiveAtom<boolean>
  sortFilterVisibilityAtom: PrimitiveAtom<boolean>
  filtersVisibilityAtom: PrimitiveAtom<boolean>
  contactModalVisibilityAtom: PrimitiveAtom<boolean>
  contactModalDataAtom: PrimitiveAtom<{
    data: SellerQuery | BrandQuery | undefined
    type: EventTrackerTypes
    title?: string
  }>
  showNavbar: PrimitiveAtom<boolean>
  navigationHeight: PrimitiveAtom<number>
}

const categoriesFilterVisibilityAtom = atom<boolean>(false)
const globalSearchModalAtom = atom<boolean>(false)
const sortFilterVisibilityAtom = atom<boolean>(false)
const filtersVisibilityAtom = atom<boolean>(false)
const contactModalVisibilityAtom = atom<boolean>(false)
const contactModalDataAtom = atom<{
  data: SellerQuery | BrandQuery | undefined
  type: EventTrackerTypes
  title?: string
}>({
  data: undefined,
  type: EventTrackerTypes.ViewOffer,
  title: "اطلاعات تماس"
})
const showNavbar = atom<boolean>(true)
const navigationHeight = atom<number>(0)

export const PublicContext = createContext<PublicContextType>({
  categoriesFilterVisibilityAtom,
  globalSearchModalAtom,
  sortFilterVisibilityAtom,
  filtersVisibilityAtom,
  contactModalVisibilityAtom,
  contactModalDataAtom,
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
        contactModalVisibilityAtom,
        contactModalDataAtom,
        navigationHeight,
        showNavbar
      }}
    >
      {children}
    </PublicContext.Provider>
  )
}

export default PublicProvider
