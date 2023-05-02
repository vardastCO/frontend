import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { ComponentProps, ReactNode } from "react"
import { Button as AriaButton } from "react-aria-components"

const button = cva("btn", {
  variants: {
    intent: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      danger: "btn-danger",
      ghost: "btn-ghost"
    },
    size: {
      xsmall: "btn-xs",
      small: "btn-sm",
      DEFAULT: "",
      medium: "btn-md",
      large: "btn-lg",
      xlarge: "btn-xl"
    },
    loading: {
      true: "btn-loading"
    },
    iconOnly: {
      true: "btn-icon-only"
    }
  },
  compoundVariants: [
    {
      intent: "primary",
      size: "DEFAULT"
    }
  ],
  defaultVariants: {
    intent: "primary",
    size: "DEFAULT"
  }
})

export interface ButtonProps
  extends ComponentProps<typeof AriaButton>,
    VariantProps<typeof button> {
  children: ReactNode
  className?: string
}

export const Button = ({ children, ...props }: ButtonProps) => {
  let { className, intent, size, loading, iconOnly } = props

  return (
    <AriaButton
      {...props}
      className={button({ intent, size, loading, iconOnly, className })}
    >
      {children}
    </AriaButton>
  )
}
