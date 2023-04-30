import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { useRef } from "react"
import { AriaButtonProps, useButton } from "react-aria"

const button = cva("btn", {
  variants: {
    intent: {
      primary: "btn-primary",
      secondary: "btn-secondary",
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

interface ButtonProps extends AriaButtonProps, VariantProps<typeof button> {
  className?: string
}

export const Button = (props: ButtonProps) => {
  let ref = useRef(null)
  let { buttonProps } = useButton(props, ref)
  let { children, className, intent, size, loading } = props

  return (
    <button
      {...buttonProps}
      className={button({ intent, size, loading, className })}
      ref={ref}
    >
      {children}
    </button>
  )
}
