"use client"

import {
  ContextValue,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps
} from "@core/utils/react-aria-utils"
import { filterDOMProps } from "@react-aria/utils"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { ForwardedRef, createContext, forwardRef } from "react"
import {
  AriaButtonProps,
  mergeProps,
  useButton,
  useFocusRing,
  useHover
} from "react-aria"

const buttonClasses = cva("btn", {
  variants: {
    intent: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      danger: "btn-danger",
      ghost: "btn-ghost"
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
  },
  compoundVariants: [
    {
      intent: "primary",
      size: "DEFAULT"
    }
  ],
  defaultVariants: {
    intent: "primary",
    size: "DEFAULT"
  }
})

export interface ButtonRenderProps {
  /**
   * Whether the button is currently hovered with a mouse.
   * @selector [data-hovered]
   */
  isHovered: boolean
  /**
   * Whether the button is currently in a pressed state.
   * @selector [data-pressed]
   */
  isPressed: boolean
  /**
   * Whether the button is focused, either via a mouse or keyboard.
   * @selector :focus
   */
  isFocused: boolean
  /**
   * Whether the button is keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean
  /**
   * Whether the button is disabled.
   * @selector :disabled
   */
  isDisabled: boolean
}

export interface ButtonProps
  extends Omit<
      AriaButtonProps,
      "children" | "href" | "target" | "rel" | "elementType"
    >,
    SlotProps,
    RenderProps<ButtonRenderProps>,
    VariantProps<typeof buttonClasses> {
  /**
   * The <form> element to associate the button with.
   * The value of this attribute must be the id of a <form> in the same document.
   */
  form?: string
  /**
   * The URL that processes the information submitted by the button.
   * Overrides the action attribute of the button's form owner.
   */
  formAction?: string
  /** Indicates how to encode the form data that is submitted. */
  formEncType?: string
  /** Indicates the HTTP method used to submit the form. */
  formMethod?: string
  /** Indicates that the form is not to be validated when it is submitted. */
  formNoValidate?: boolean
  /** Overrides the target attribute of the button's form owner. */
  formTarget?: string
  /** Submitted as a pair with the button's value as part of the form data. */
  name?: string
  /** The value associated with the button's name when it's submitted with the form data. */
  value?: string
}

interface ButtonContextValue extends ButtonProps {
  isPressed?: boolean
}

const additionalButtonHTMLAttributes = new Set([
  "form",
  "formAction",
  "formEncType",
  "formMethod",
  "formNoValidate",
  "formTarget",
  "name",
  "value"
])

export const ButtonContext = createContext<
  ContextValue<ButtonContextValue, HTMLButtonElement>
>({})

function Button(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  ;[props, ref] = useContextProps(props, ref, ButtonContext)
  let { className, intent, size, loading, iconOnly, fullWidth } = props
  let ctx = props as ButtonContextValue
  let { buttonProps, isPressed } = useButton(props, ref)
  let { focusProps, isFocused, isFocusVisible } = useFocusRing(props)
  let { hoverProps, isHovered } = useHover(props)
  let renderProps = useRenderProps({
    ...props,
    values: {
      isHovered,
      isPressed,
      isFocused,
      isFocusVisible,
      isDisabled: props.isDisabled || false
    },
    defaultClassName: "react-aria-Button"
  })

  return (
    <button
      {...filterDOMProps(props, { propNames: additionalButtonHTMLAttributes })}
      {...mergeProps(buttonProps, focusProps, hoverProps)}
      {...renderProps}
      ref={ref}
      slot={props.slot}
      className={buttonClasses({
        intent,
        size,
        loading,
        iconOnly,
        fullWidth,
        className
      })}
      data-pressed={ctx.isPressed || isPressed || undefined}
      data-hovered={isHovered || undefined}
      data-focus-visible={isFocusVisible || undefined}
    />
  )
}

/**
 * A button allows a user to perform an action, with mouse, touch, and keyboard interactions.
 */
const _Button = forwardRef(Button)
export { _Button as Button }
