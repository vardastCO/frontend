import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { mergeClasses } from "@core/utils/mergeClasses"

const alertVariants = cva(
  "relative w-full rounded-md border p-4 [&>svg~*]:pr-9 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-4 [&>svg]:text-gray-400",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-700",
        danger:
          "bg-red-500/5 border-red-500/20 text-red-600 [&>svg]:text-red-500",
        warning:
          "bg-amber-500/5 border-amber-500/20 text-amber-700 [&>svg]:text-amber-500",
        info: "bg-blue-500/5 border-blue-500/20 text-blue-600 [&>svg]:text-blue-500",
        success:
          "bg-emerald-500/5 border-emerald-500/20 text-emerald-700 [&>svg]:text-emerald-500"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={mergeClasses(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={mergeClasses(
      "mb-1 font-medium leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={mergeClasses("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription, AlertTitle }
