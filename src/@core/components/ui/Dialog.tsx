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
      {(title || description) && (
        <div className="dialog-header">
          {title && (
            <h3 className="dialog-title" {...titleProps}>
              {title}
            </h3>
          )}
          {description && <p className="dialog-description">{description}</p>}
        </div>
      )}
      <div className="dialog-content">{children}</div>
    </div>
  )
}
