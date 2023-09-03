"use client"

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { LucideCircle } from "lucide-react"

import { mergeClasses } from "@core/utils/mergeClasses"

const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={mergeClasses("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={mergeClasses("radio", className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="radio-indicator">
        <LucideCircle />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
