import { ReactNode, useRef } from "react"
import type { AriaDialogProps } from "react-aria"
import { useDialog } from "react-aria"

interface DialogProps extends AriaDialogProps {
  children: ReactNode
}

export const Dialog = ({ children, ...props }: DialogProps) => {
  let ref = useRef(null)
  let { dialogProps } = useDialog(props, ref)

  return (
    <div {...dialogProps} ref={ref}>
      {children}
    </div>
  )
}

interface DialogFooterProps {
  children: ReactNode
}

export const DialogFooter = ({ children }: DialogFooterProps) => {
  return <div className="dialog-footer">{children}</div>
}

interface DialogContentProps {
  children: ReactNode
}

export const DialogContent = ({ children }: DialogContentProps) => {
  return <div className="dialog-content">{children}</div>
}

interface DialogHeaderProps {
  title: ReactNode
  description?: ReactNode
}

export const DialogHeader = ({ title, description }: DialogHeaderProps) => {
  {
    return (
      <div className="dialog-header">
        {title && <h3 className="dialog-title">{title}</h3>}
        {description && <p className="dialog-description">{description}</p>}
      </div>
    )
  }
}
