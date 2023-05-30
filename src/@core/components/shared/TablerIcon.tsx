import * as icons from "@tabler/icons-react"

interface Props {
  icon: string
  className?: string
  color?: string
  size?: number
  stroke?: number
}

export const TablerIcons = (props: Props): JSX.Element => {
  const { icon, color = "gray", size = 24, stroke = 2, className } = props

  // @ts-ignore
  const Icon: JSX.Element = icons[icon]

  return (
    // @ts-ignore
    <Icon stroke={stroke} className={className} />
  )
}
