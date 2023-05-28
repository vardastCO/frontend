"use client"

import { createContext } from "react"

interface VocabulariesContextType {}

export const VocabulariesContext = createContext<VocabulariesContextType>({})

type Props = {
  children: React.ReactNode
}

export default function VocabulariesProvider({ children }: Props) {
  return (
    <VocabulariesContext.Provider value={{}}>
      {children}
    </VocabulariesContext.Provider>
  )
}
