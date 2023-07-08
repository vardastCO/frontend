"use client"

import { useEffect, useState } from "react"
import { IconLoader2, TablerIconsProps } from "@tabler/icons-react"

interface TablerDynamicIconsProps extends TablerIconsProps {
  iconName: string
}

export const TablerDynamicIcons = ({
  iconName,
  ...props
}: TablerDynamicIconsProps): JSX.Element => {
  const [IconComponent, setIconComponent] = useState<React.ElementType | null>(
    null
  )

  useEffect(() => {
    const importIcon = async () => {
      // @ts-ignore
      const { [iconName]: Icon } = await import("@tabler/icons-react")
      setIconComponent(() => Icon)
    }

    importIcon()
  }, [iconName])

  if (!IconComponent) {
    // Render a placeholder or loading state while the icon is being imported
    return <IconLoader2 className="h-4 w-4 animate-spin text-gray-400" />
  }

  return <IconComponent {...props} />
}
