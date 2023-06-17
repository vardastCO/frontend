"use client"

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { mergeClasses } from "@core/utils/mergeClasses"

const avatarVariants = cva("avatar", {
  variants: {
    size: {
      xsmall: "avatar-xs",
      small: "avatar-sm",
      DEFAULT: "",
      medium: "avatar-md",
      large: "avatar-lg",
      xlarge: "avatar-xl"
    },
    rounded: {
      true: "rounded-full"
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

export interface AvatarProps
  extends AvatarPrimitive.AvatarProps,
    VariantProps<typeof avatarVariants> {}

const Avatar = forwardRef<
  ElementRef<typeof AvatarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ size, rounded, className, ...props }: AvatarProps, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={mergeClasses(
      avatarVariants({
        size,
        rounded,
        className
      })
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = forwardRef<
  ElementRef<typeof AvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={mergeClasses("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = forwardRef<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={mergeClasses(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarFallback, AvatarImage }
