"use client"

import { Area, City, Country, Province } from "@/generated"
import { PrimitiveAtom, atom, useAtom } from "jotai"
import { createContext } from "react"
import DeleteModal from "./DeleteModal"

interface entityToRemoveAtomType {
  type: "country" | "province" | "city" | "area" | "undefined"
  entity: Country | Province | City | Area | undefined
}

interface LocationsContextType {
  removeStateAtom: PrimitiveAtom<boolean>
  entityToRemoveAtom: PrimitiveAtom<entityToRemoveAtomType>
}

const removeStateAtom = atom<boolean>(false)
const entityToRemoveAtom = atom<entityToRemoveAtomType>({
  type: "undefined",
  entity: undefined
})

export const LocationsContext = createContext<LocationsContextType>({
  removeStateAtom,
  entityToRemoveAtom
})

type Props = {
  children: React.ReactNode
}

export default function LocationsProvider({ children }: Props) {
  const [removeState, setRemoveState] = useAtom(removeStateAtom)

  return (
    <LocationsContext.Provider value={{ removeStateAtom, entityToRemoveAtom }}>
      <DeleteModal isOpen={removeState} onChange={setRemoveState} />
      {children}
    </LocationsContext.Provider>
  )
}
