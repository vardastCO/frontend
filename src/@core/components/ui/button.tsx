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
      variant: "primary",
      size: "DEFAULT"
    }
  ],
  defaultVariants: {
    variant: "primary",
    size: "DEFAULT"
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
