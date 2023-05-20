"use client"

import { Vocabulary } from "@/generated"
import { IconFolder } from "@tabler/icons-react"

import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import { useState } from "react"

type VocabularyCardProps = {
  vocabulary: Vocabulary
}

const VocabularyCard = ({ vocabulary }: VocabularyCardProps) => {
  const { t } = useTranslation()
  const { slug, title } = vocabulary
  const [active, setActive] = useState(false)

  return (
    <div className="card flex items-center gap-3 rounded bg-white px-4 py-4">
      <div className="flex items-center gap-2">
        <Link
          href={`/admin/vocabularies/${slug}`}
          className="flex items-center gap-1 font-bold text-gray-800 underline-offset-2 hover:text-gray-900 hover:underline"
        >
          <IconFolder className="h-6 w-6 text-gray-500" />
          {title}
        </Link>
      </div>
    </div>
  )
}

export default VocabularyCard
