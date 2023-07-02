"use client"

import { createContext, useState } from "react"
import { atom, PrimitiveAtom, useAtom } from "jotai"

import { Area, City, Country, Province } from "@/generated"

import DeleteModal from "./DeleteModal"

interface entityToRemoveAtomType {
  type: "country" | "province" | "city" | "area" | "undefined"
  entity: Country | Province | City | Area | undefined
}

interface LocationsContextType {
  removeStateAtom: PrimitiveAtom<boolean>
  entityToRemoveAtom: PrimitiveAtom<entityToRemoveAtomType>
  activesOnly: boolean
  setActivesOnly: (state: boolean) => void
  toggleActivesOnly: () => void
}

const removeStateAtom = atom<boolean>(false)
const entityToRemoveAtom = atom<entityToRemoveAtomType>({
  type: "undefined",
  entity: undefined
})

export const LocationsContext = createContext<LocationsContextType>({
  removeStateAtom,
  entityToRemoveAtom,
  activesOnly: false,
  setActivesOnly: (state: boolean) => {},
  toggleActivesOnly: () => {}
})

type Props = {
  children: React.ReactNode
}

export default function LocationsProvider({ children }: Props) {
  const [activesOnly, setActivesOnly] = useState<boolean>(false)
  const [removeState, setRemoveState] = useAtom(removeStateAtom)

  const toggleActivesOnly = () => {
    const oldActivesOnlyMode = activesOnly
    setActivesOnly(!oldActivesOnlyMode)
  }

  return (
    <LocationsContext.Provider
      value={{
        removeStateAtom,
        entityToRemoveAtom,
        activesOnly,
        setActivesOnly,
        toggleActivesOnly
      }}
    >
      <DeleteModal isOpen={removeState} onChange={setRemoveState} />
      {children}
    </LocationsContext.Provider>
  )
}
