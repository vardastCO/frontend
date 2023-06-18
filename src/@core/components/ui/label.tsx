"use client"

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { mergeClasses } from "@core/utils/mergeClasses"

const labelVariants = cva("form-label")

interface LabelProps extends VariantProps<typeof labelVariants> {
  noStyle?: boolean
}

const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & LabelProps
>(({ noStyle = false, className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={
      noStyle
        ? mergeClasses(className)
        : mergeClasses(labelVariants(), className)
    }
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
