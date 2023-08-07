"use client"

import { createContext } from "react"
import { atom, PrimitiveAtom, useAtom } from "jotai"

import { Category, Vocabulary } from "@/generated"

interface entityToRemoveAtomType {
  type: "vocabulary" | "category" | "undefined"
  entity: Vocabulary | Category | undefined
}

interface VocabulariesContextType {
  removeStateAtom: PrimitiveAtom<boolean>
  entityToRemoveAtom: PrimitiveAtom<entityToRemoveAtomType>
}

const removeStateAtom = atom<boolean>(false)
const entityToRemoveAtom = atom<entityToRemoveAtomType>({
  type: "undefined",
  entity: undefined
})

export const VocabulariesContext = createContext<VocabulariesContextType>({
  removeStateAtom,
  entityToRemoveAtom
})

type Props = {
  children: React.ReactNode
}

export default function VocabulariesProvider({ children }: Props) {
  const [removeState, setRemoveState] = useAtom(removeStateAtom)

  return (
    <VocabulariesContext.Provider
      value={{
        removeStateAtom,
        entityToRemoveAtom
      }}
    >
      {/* <DeleteModal isOpen={removeState} onChange={setRemoveState} /> */}
      {children}
    </VocabulariesContext.Provider>
  )
}
