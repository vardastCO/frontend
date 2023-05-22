"use client"

import {
  ContextValue,
  DOMProps,
  Provider,
  SlotProps,
  useContextProps,
  useSlot
} from "@core/utils/react-aria-utils"
import { filterDOMProps } from "@react-aria/utils"
import { ForwardedRef, createContext, forwardRef, useRef } from "react"
import { AriaTextFieldProps, useTextField } from "react-aria"
import { InputContext } from "./Input"
import { Label } from "./Label"

export interface TextFieldProps
  extends AriaTextFieldProps,
    DOMProps,
    SlotProps {}

export const TextFieldContext =
  createContext<ContextValue<TextFieldProps, HTMLDivElement>>(null)

function TextField(props: TextFieldProps, ref: ForwardedRef<HTMLDivElement>) {
  ;[props, ref] = useContextProps(props, ref, TextFieldContext)

  let inputRef = useRef<HTMLInputElement>(null)
  let [labelRef, label] = useSlot()
  let { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(
      {
        ...props,
        label
      },
      inputRef
    )

  return (
    <div
      {...filterDOMProps(props)}
      ref={ref}
      slot={props.slot}
      className="form-field"
      style={props.style}
    >
      <Label {...labelProps} ref={labelRef}>
        {props.label}
      </Label>
      <Provider values={[[InputContext, { ...inputProps, ref: inputRef }]]}>
        {props.children}
        {props.description && (
          <span className="form-message" {...descriptionProps}>
            {props.description}
          </span>
        )}
        {props.errorMessage && (
          <span className="form-message error" {...errorMessageProps}>
            {props.errorMessage}
          </span>
        )}
      </Provider>
    </div>
  )
}

/**
 * A text field allows a user to enter a plain text value with a keyboard.
 */
const _TextField = forwardRef(TextField)
export { _TextField as TextField }
