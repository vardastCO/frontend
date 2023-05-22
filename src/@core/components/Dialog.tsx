import { ComponentProps } from "react"
import { Dialog as AriaDialog } from "react-aria-components"

interface DialogProps extends ComponentProps<typeof AriaDialog> {}

export const Dialog = ({ children }: DialogProps) => {
  return <AriaDialog>{children}</AriaDialog>
}
