"use client"

import { VariantProps, cva } from "class-variance-authority"
import { ReactNode } from "react"
import {
  Input as AriaInput,
  Label as AriaLabel,
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps
} from "react-aria-components"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"

const formControlClasses = cva("form-control", {
  variants: {
    size: {
      xsmall: "form-control-xs",
      small: "form-control-sm",
      DEFAULT: "",
      medium: "form-control-md",
      large: "form-control-lg",
      xlarge: "form-control-xl"
    },
    rounded: {
      true: "form-control-rounded"
    },
    plaintext: {
      true: "form-control-plaintext"
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

interface TextFieldProps
  extends AriaTextFieldProps,
    VariantProps<typeof formControlClasses> {
  label?: string
  prefixAddon?: ReactNode
  suffixAddon?: ReactNode
  prefixElement?: ReactNode
  suffixElement?: ReactNode
  placeholder?: string
  description?: string
  errorMessage?: string
  dir?: "rtl" | "ltr"
}

function TextField<T extends FieldValues>({
  prefixAddon,
  suffixAddon,
  prefixElement,
  suffixElement,
  label,
  name,
  control,
  description,
  errorMessage,
  size,
  rounded,
  plaintext,
  dir,
  ...props
}: TextFieldProps & UseControllerProps<T>) {
  const { field } = useController({
    name,
    control
  })

  return (
    <AriaTextField {...props} className="form-field">
      <AriaLabel className="form-label">{label}</AriaLabel>
      <div
        className={formControlClasses({
          size,
          rounded,
          plaintext
        })}
      >
        <div className="input-group">
          {prefixAddon && <div className="input-addon">{prefixAddon}</div>}
          <div className="input-inset">
            {prefixElement && (
              <div className="input-element">{prefixElement}</div>
            )}
            <AriaInput className="input-field" dir={dir} {...field} />
            {suffixElement && (
              <div className="input-element">{suffixElement}</div>
            )}
          </div>
          {suffixAddon && <div className="input-addon">{suffixAddon}</div>}
        </div>
      </div>
      {errorMessage && (
        <span className="form-message error">{errorMessage}</span>
      )}
      {description && <span className="form-message">{description}</span>}
    </AriaTextField>
  )
}

export default TextField
