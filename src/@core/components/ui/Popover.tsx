import { ReactNode } from "react"
import {
  Dialog as AriaDialog,
  OverlayArrow as AriaOverlayArrow,
  Popover as AriaPopover,
  PopoverProps as AriaPopoverProps
} from "react-aria-components"

interface PopoverProps extends AriaPopoverProps {
  children: ReactNode
}

export const Popover = ({ children, ...props }: PopoverProps) => {
  return (
    <AriaPopover {...props}>
      <AriaOverlayArrow>
        <svg width={12} height={12}>
          <path d="M0 0,L6 6,L12 0" />
        </svg>
      </AriaOverlayArrow>
      <AriaDialog>{children}</AriaDialog>
    </AriaPopover>
  )
}
