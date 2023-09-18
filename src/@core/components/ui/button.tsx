"use client"

import { forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { mergeClasses } from "@core/utils/mergeClasses"

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      danger: "btn-danger",
      ghost: "btn-ghost",
      link: "btn-link"
    },
    size: {
      xsmall: "btn-xs",
      small: "btn-sm",
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
    },
    other: {
      block: "btn-block"
    }
  },
  compoundVariants: [
    {
      variant: "primary",
      size: "medium"
    }
  ],
  defaultVariants: {
    variant: "primary",
    size: "medium"
  }
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  noStyle?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading,
      fullWidth,
      iconOnly,
      other,
      asChild = false,
      noStyle = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={mergeClasses(
          noStyle
            ? `${className}`
            : buttonVariants({
                variant,
                size,
                loading,
                fullWidth,
                iconOnly,
                other,
                className
              })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
