import { ReactNode, useRef } from "react"
import type { AriaDialogProps } from "react-aria"
import { useDialog } from "react-aria"

interface DialogProps extends AriaDialogProps {
  title?: ReactNode
  description?: ReactNode
  children: ReactNode
}

export const Dialog = ({
  title,
  description,
  children,
  ...props
}: DialogProps) => {
  let ref = useRef(null)
  let { dialogProps, titleProps } = useDialog(props, ref)

  return (
    <div {...dialogProps} ref={ref}>
      {title && <h3 {...titleProps}>{title}</h3>}
      {description && <p>{description}</p>}
      {children}
    </div>
  )
}
