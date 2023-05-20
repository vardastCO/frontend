"use client"

import { ReactNode } from "react"
import {
  Input as AriaInput,
  Label as AriaLabel,
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps
} from "react-aria-components"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"

interface TextFieldProps extends AriaTextFieldProps {
  label?: string
  prefixAddon?: ReactNode
  suffixAddon?: ReactNode
  prefixElement?: ReactNode
  suffixElement?: ReactNode
  placeholder?: string
  description?: string
  errorMessage?: string
}

function TextField<T extends FieldValues>({
  prefixAddon,
  suffixAddon,
  prefixElement,
  suffixElement,
  label,
  name,
  control,
  errorMessage,
  ...props
}: TextFieldProps & UseControllerProps<T>) {
  const { field } = useController({
    name,
    control
  })

  return (
    <AriaTextField {...props} className="form-field">
      <AriaLabel className="form-label">{label}</AriaLabel>
      <div className="form-control">
        <div className="input-group">
          {prefixAddon && <div className="input-addon">{prefixAddon}</div>}
          <div className="input-inset">
            {prefixElement && (
              <div className="input-element">{prefixElement}</div>
            )}
            <AriaInput className="input-field" {...field} />
            {suffixElement && (
              <div className="input-element">{suffixElement}</div>
            )}
          </div>
          {suffixAddon && <div className="input-addon">{suffixAddon}</div>}
        </div>
        {errorMessage && (
          <span className="form-message error">{errorMessage}</span>
        )}
      </div>
    </AriaTextField>
  )
}

export default TextField
