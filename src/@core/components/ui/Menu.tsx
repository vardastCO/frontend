import {
    Dialog as AriaDialog,
    Item as AriaItem,
    ItemProps as AriaItemProps,
    Menu as AriaMenu,
    MenuProps as AriaMenuProps,
    MenuTrigger as AriaMenuTrigger,
    MenuTriggerProps as AriaMenuTriggerProps,
    OverlayArrow as AriaOverlayArrow,
    Popover as AriaPopover
} from "react-aria-components"
import { Button, ButtonProps } from "./Button"

interface MenuProps<T>
  extends AriaMenuProps<T>,
    Omit<AriaMenuTriggerProps, "children"> {
  label?: string
  buttonProps?: ButtonProps
}

export const Menu = <T extends object>({
  label,
  children,
  buttonProps,
  ...props
}: MenuProps<T>) => {
  return (
    <AriaMenuTrigger {...props}>
      <Button {...buttonProps}>{buttonProps?.children}</Button>
      <AriaPopover className="dropdown-menu">
        <AriaOverlayArrow className="dropdown-menu-arrow">
          <svg width={12} height={12}>
            <path d="M0 0,L6 6,L12 0" />
          </svg>
        </AriaOverlayArrow>
        <AriaDialog className="dropdown-menu-content">
          <AriaMenu {...props}>{children}</AriaMenu>
        </AriaDialog>
      </AriaPopover>
    </AriaMenuTrigger>
  )
}

interface ItemProps extends AriaItemProps {}

export const Item = (props: ItemProps) => {
  return <AriaItem {...props} className={`dropdown-menu-item ${props.className}`} />
}
