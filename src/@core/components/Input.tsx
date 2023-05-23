"use client"

import {
  ContextValue,
  StyleRenderProps,
  useContextProps,
  useRenderProps
} from "@core/utils/react-aria-utils"
import { VariantProps, cva } from "class-variance-authority"
import {
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  createContext,
  forwardRef
} from "react"
import { mergeProps, useFocusRing, useHover } from "react-aria"

const formControlClasses = cva("form-control", {
  variants: {
    inputSize: {
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
      inputSize: "DEFAULT"
    }
  ],
  defaultVariants: {
    inputSize: "DEFAULT"
  }
})

export interface InputRenderProps {
  /**
   * Whether the input is currently hovered with a mouse.
   * @selector [data-hovered]
   */
  isHovered: boolean
  /**
   * Whether the input is focused, either via a mouse or keyboard.
   * @selector :focus
   */
  isFocused: boolean
  /**
   * Whether the input is keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean
  /**
   * Whether the input is disabled.
   * @selector :disabled
   */
  isDisabled: boolean
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "style">,
    StyleRenderProps<InputRenderProps>,
    VariantProps<typeof formControlClasses> {
  prefixAddon?: ReactNode
  suffixAddon?: ReactNode
  prefixElement?: ReactNode
  suffixElement?: ReactNode
}

export const InputContext = createContext<
  ContextValue<InputProps, HTMLInputElement>
>({})

function Input(
  {
    prefixAddon,
    suffixAddon,
    prefixElement,
    suffixElement,
    inputSize,
    rounded,
    plaintext,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  ;[props, ref] = useContextProps(props, ref, InputContext)

  let { hoverProps, isHovered } = useHover({})
  let { isFocused, isFocusVisible, focusProps } = useFocusRing({
    isTextInput: true,
    autoFocus: props.autoFocus
  })

  let renderProps = useRenderProps({
    ...props,
    values: {
      isHovered,
      isFocused,
      isFocusVisible,
      isDisabled: props.disabled || false
    },
    defaultClassName: "input-field"
  })

  return (
    <div
      className={formControlClasses({
        inputSize,
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
          <input
            {...mergeProps(props, focusProps, hoverProps)}
            {...renderProps}
            ref={ref}
            data-hovered={isHovered || undefined}
            data-focus-visible={isFocusVisible || undefined}
          />
          {suffixElement && (
            <div className="input-element">{suffixElement}</div>
          )}
        </div>
        {suffixAddon && <div className="input-addon">{suffixAddon}</div>}
      </div>
    </div>
  )
}

/**
 * An input allows a user to input text.
 */
const _Input = forwardRef(Input)
export { _Input as Input }
