"use client"

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { mergeClasses } from "@core/utils/mergeClasses"

const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitives.Root>,
  ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={mergeClasses("switch", className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className={mergeClasses("switch-thumb")} />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
