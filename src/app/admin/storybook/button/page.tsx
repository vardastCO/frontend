// @ts-nocheck

import { LucideSend } from "lucide-react"

import { Button } from "@core/components/ui/button"

const buttonVariants = {
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
}

const StorybookButtonPage = () => {
  return (
    <div className="mx-auto my-20 flex max-w-2xl flex-col gap-12">
      <div className="flex flex-col gap-6">
        {Object.keys(buttonVariants.variant).map((variant, idx) => {
          return (
            <>
              <div className="flex items-center gap-4" key={idx}>
                {Object.keys(buttonVariants.size).map((size, idx) => {
                  return (
                    <Button key={idx} size={size} variant={variant}>
                      کلیک کن!
                    </Button>
                  )
                })}
              </div>
              <div className="flex items-center gap-4" key={idx}>
                {Object.keys(buttonVariants.size).map((size, idx) => {
                  return (
                    <Button key={idx} size={size} variant={variant}>
                      <LucideSend className="icon" />
                      کلیک کن!
                    </Button>
                  )
                })}
              </div>
              <div className="flex items-center gap-4" key={idx}>
                {Object.keys(buttonVariants.size).map((size, idx) => {
                  return (
                    <Button key={idx} size={size} variant={variant}>
                      کلیک کن!
                      <LucideSend className="icon" />
                    </Button>
                  )
                })}
              </div>
              <div className="flex items-center gap-4" key={idx}>
                {Object.keys(buttonVariants.size).map((size, idx) => {
                  return (
                    <Button key={idx} size={size} variant={variant} loading>
                      کلیک کن!
                    </Button>
                  )
                })}
              </div>
              <div className="flex items-center gap-4" key={idx}>
                {Object.keys(buttonVariants.size).map((size, idx) => {
                  return (
                    <Button key={idx} size={size} variant={variant} disabled>
                      <LucideSend className="icon" />
                      کلیک کن!
                    </Button>
                  )
                })}
              </div>
              <div className="flex items-center gap-4" key={idx}>
                {Object.keys(buttonVariants.size).map((size, idx) => {
                  return (
                    <Button key={idx} size={size} variant={variant} iconOnly>
                      <LucideSend className="icon" />
                    </Button>
                  )
                })}
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default StorybookButtonPage
