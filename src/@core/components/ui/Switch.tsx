import { VariantProps, cva } from "class-variance-authority"
import { ComponentProps, ReactNode } from "react"
import { Switch as AriaSwitch } from "react-aria-components"

const switchClasses = cva("switch group", {
  variants: {
    size: {
      xsmall: "switch-xs",
      small: "switch-sm",
      DEFAULT: "",
      medium: "switch-md",
      large: "switch-lg",
      xlarge: "switch-xl"
    }
  },
  compoundVariants: [
    {
      size: "DEFAULT"
    }
  ],
  defaultVariants: {
    size: "DEFAULT"
  }
})

interface SwitchProps
  extends ComponentProps<typeof AriaSwitch>,
    VariantProps<typeof switchClasses> {
  children: ReactNode
  className?: string
}

export const Switch = ({ children, ...props }: SwitchProps) => {
  let { className, size } = props

  return (
    <AriaSwitch {...props} className={switchClasses({ size, className })}>
      <span className="switch-body">
        <span className="switch-thumb" />
      </span>
      <span>{children}</span>
    </AriaSwitch>
  )
}
