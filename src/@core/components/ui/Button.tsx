"use client"

import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { ComponentProps, ReactNode } from "react"
import { Button as AriaButton } from "react-aria-components"

const buttonClasses = cva("btn", {
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
    fullWidth: {
      true: "w-full"
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
    VariantProps<typeof buttonClasses> {
  children: ReactNode
  className?: string
}

export const Button = ({ children, ...props }: ButtonProps) => {
  let { className, intent, size, loading, iconOnly, fullWidth } = props

  return (
    <AriaButton
      {...props}
      className={buttonClasses({
        intent,
        size,
        loading,
        iconOnly,
        fullWidth,
        className
      })}
    >
      {children}
    </AriaButton>
  )
}
