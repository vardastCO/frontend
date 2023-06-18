"use client"

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"

import { mergeClasses } from "@core/utils/mergeClasses"

const switchVariants = cva("switch group", {
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

const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitives.Root>,
  ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> &
    VariantProps<typeof switchVariants>
>(({ size, className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={mergeClasses(switchVariants({ size }), className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className={mergeClasses("switch-thumb")} />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
