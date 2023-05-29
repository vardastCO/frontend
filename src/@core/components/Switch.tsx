"use client"

import {
  ContextValue,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps
} from "@core/utils/react-aria-utils"
import { filterDOMProps } from "@react-aria/utils"
import { VariantProps, cva } from "class-variance-authority"
import { ForwardedRef, createContext, forwardRef, useState } from "react"
import {
  AriaSwitchProps,
  VisuallyHidden,
  mergeProps,
  useFocusRing,
  useHover,
  usePress,
  useSwitch
} from "react-aria"
import { useToggleState } from "react-stately"

const switchClasses = cva("switch group", {
  variants: {
    size: {
      xsmall: "switch-xs",
      small: "switch-sm",
      DEFAULT: "",
      medium: "switch-md",
      large: "switch-lg",
      xlarge: "switch-xl"
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

export interface SwitchProps
  extends Omit<AriaSwitchProps, "children">,
    RenderProps<SwitchRenderProps>,
    VariantProps<typeof switchClasses>,
    SlotProps {}

export interface SwitchRenderProps {
  /**
   * Whether the switch is selected.
   * @selector [data-selected]
   */
  isSelected: boolean
  /**
   * Whether the switch is currently hovered with a mouse.
   * @selector [data-hovered]
   */
  isHovered: boolean
  /**
   * Whether the switch is currently in a pressed state.
   * @selector [data-pressed]
   */
  isPressed: boolean
  /**
   * Whether the switch is focused, either via a mouse or keyboard.
   * @selector [data-focused]
   */
  isFocused: boolean
  /**
   * Whether the switch is keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean
  /**
   * Whether the switch is disabled.
   * @selector [data-disabled]
   */
  isDisabled: boolean
  /**
   * Whether the switch is read only.
   * @selector [data-readonly]
   */
  isReadOnly: boolean
}

export const SwitchContext =
  createContext<ContextValue<SwitchProps, HTMLInputElement>>(null)

function Switch(
  { size, ...props }: SwitchProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  ;[props, ref] = useContextProps(props, ref, SwitchContext)
  //   @ts-ignore
  let state = useToggleState(props)
  let {
    inputProps,
    isSelected,
    isDisabled,
    isReadOnly,
    isPressed: isPressedKeyboard
  } =
    //   @ts-ignore
    useSwitch(props, state, ref)
  let { isFocused, isFocusVisible, focusProps } = useFocusRing()
  let isInteractionDisabled = props.isDisabled || props.isReadOnly

  // Handle press state for full label. Keyboard press state is returned by useSwitch
  // since it is handled on the <input> element itself.
  let [isPressed, setPressed] = useState(false)
  let { pressProps } = usePress({
    isDisabled: isInteractionDisabled,
    onPressStart(e) {
      if (e.pointerType !== "keyboard") {
        setPressed(true)
      }
    },
    onPressEnd(e) {
      if (e.pointerType !== "keyboard") {
        setPressed(false)
      }
    }
  })

  let { hoverProps, isHovered } = useHover({
    isDisabled: isInteractionDisabled
  })

  let pressed = isInteractionDisabled ? false : isPressed || isPressedKeyboard

  let renderProps = useRenderProps({
    ...props,
    defaultClassName: switchClasses({ size }),
    values: {
      isSelected,
      isPressed: pressed,
      isHovered,
      isFocused,
      isFocusVisible,
      isDisabled,
      isReadOnly
    }
  })

  let DOMProps = filterDOMProps(props)
  delete DOMProps.id

  return (
    <label
      {...mergeProps(DOMProps, pressProps, hoverProps, renderProps)}
      slot={props.slot}
      data-selected={isSelected || undefined}
      data-pressed={pressed || undefined}
      data-hovered={isHovered || undefined}
      data-focused={isFocused || undefined}
      data-focus-visible={isFocusVisible || undefined}
      data-disabled={isDisabled || undefined}
      data-readonly={isReadOnly || undefined}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <span className="switch-body">
        <span className="switch-thumb" />
      </span>
      <span>{renderProps.children}</span>
    </label>
  )
}

/**
 * A switch allows a user to turn a setting on or off.
 */
const _Switch = forwardRef(Switch)
export { _Switch as Switch }
