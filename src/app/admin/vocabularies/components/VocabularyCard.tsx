"use client"

import { Vocabulary } from "@/generated"

import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import { useState } from "react"
import { Switch } from "../../../../@core/components/ui/Switch"

type VocabularyCardProps = {
  vocabulary: Vocabulary
}

const VocabularyCard = ({ vocabulary }: VocabularyCardProps) => {
  const { t } = useTranslation()
  const { slug, title } = vocabulary
  const [active, setActive] = useState(false)

  return (
    <div className="card flex items-center gap-3 rounded bg-white px-4 py-2">
      <div className="flex items-center gap-2">
        <Link
          href={`/admin/vocabularies/${slug}`}
          className="font-bold text-gray-800 underline-offset-2 hover:text-gray-900 hover:underline"
        >
          {title}
        </Link>
      </div>
      <div className="mr-auto flex items-center gap-2">
        <Switch onChange={setActive} isSelected={active} size="small">
          {t("is_active")}
        </Switch>
      </div>
    </div>
  )
}

export default VocabularyCard
