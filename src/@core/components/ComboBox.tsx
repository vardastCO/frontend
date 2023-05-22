"use client"

import {
  ContextValue,
  Provider,
  RenderProps,
  SlotProps,
  forwardRefType,
  slotCallbackSymbol,
  useContextProps,
  useRenderProps,
  useSlot
} from "@core/utils/react-aria-utils"
import { filterDOMProps, useResizeObserver } from "@react-aria/utils"
import React, {
  ForwardedRef,
  createContext,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState
} from "react"
import { AriaComboBoxProps, useComboBox, useFilter } from "react-aria"
import { useComboBoxState } from "react-stately"
import { useCollection } from "./Collection"
import { InputContext } from "./Input"
import { Label } from "./Label"
import { ListBoxContext, ListBoxProps } from "./ListBox"
import { PopoverContext } from "./Popover"

export interface ComboBoxRenderProps {
  /**
   * Whether the combobox is focused, either via a mouse or keyboard.
   * @selector [data-focused]
   */
  isFocused: boolean
  /**
   * Whether the combobox is currently open.
   * @selector [data-open]
   */
  isOpen: boolean
}

export interface ComboBoxProps<T extends object>
  extends Omit<AriaComboBoxProps<T>, "children" | "placeholder" | "name">,
    RenderProps<ComboBoxRenderProps>,
    SlotProps {
  /** The filter function used to determine if a option should be included in the combo box list. */
  defaultFilter?: (textValue: string, inputValue: string) => boolean
}

export const ComboBoxContext =
  createContext<ContextValue<ComboBoxProps<any>, HTMLDivElement>>(null)

function ComboBox<T extends object>(
  props: ComboBoxProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  ;[props, ref] = useContextProps(props, ref, ComboBoxContext)
  let [propsFromListBox, setListBoxProps] = useState<ListBoxProps<T>>({
    children: []
  })

  let { contains } = useFilter()
  let { portal, collection } = useCollection({
    items: props.items ?? props.defaultItems ?? propsFromListBox.items,
    children: propsFromListBox.children
  })
  let state = useComboBoxState({
    defaultFilter: props.defaultFilter || contains,
    ...props,
    // If props.items isn't provided, rely on collection filtering (aka listbox.items is provided or defaultItems provided to Combobox)
    items: props.items,
    children: undefined,
    collection
  })

  // Only expose a subset of state to renderProps function to avoid infinite render loop
  let renderPropsState = useMemo(
    () => ({ isOpen: state.isOpen, isFocused: state.isFocused }),
    [state.isOpen, state.isFocused]
  )
  let buttonRef = useRef<HTMLButtonElement>(null)
  let inputRef = useRef<HTMLInputElement>(null)
  let listBoxRef = useRef<HTMLDivElement>(null)
  let popoverRef = useRef<HTMLDivElement>(null)
  let [labelRef, label] = useSlot()
  let {
    buttonProps,
    inputProps,
    listBoxProps,
    labelProps,
    descriptionProps,
    errorMessageProps
  } = useComboBox(
    {
      ...props,
      label,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef
    },
    state
  )

  // Make menu width match input + button
  let [menuWidth, setMenuWidth] = useState<string | null>(null)
  let onResize = useCallback(() => {
    if (inputRef.current) {
      let buttonRect = buttonRef.current?.getBoundingClientRect()
      let inputRect = inputRef.current.getBoundingClientRect()
      let minX = buttonRect
        ? Math.min(buttonRect.left, inputRect.left)
        : inputRect.left
      let maxX = buttonRect
        ? Math.max(buttonRect.right, inputRect.right)
        : inputRect.right
      setMenuWidth(maxX - minX + "px")
    }
  }, [buttonRef, inputRef, setMenuWidth])

  useResizeObserver({
    ref: inputRef,
    onResize: onResize
  })

  let renderProps = useRenderProps({
    ...props,
    values: renderPropsState,
    defaultClassName: "combobox"
  })

  let DOMProps = filterDOMProps(props)
  delete DOMProps.id

  return (
    <div className="form-field">
      <Label {...labelProps} ref={labelRef}>
        {props.label}
      </Label>
      <Provider
        values={[
          [
            InputContext,
            {
              ...inputProps,
              ref: inputRef
            }
          ],
          [
            PopoverContext,
            {
              state,
              ref: popoverRef,
              triggerRef: inputRef,
              placement: "bottom start",
              preserveChildren: true,
              isNonModal: true,
              className: "combobox-list-container",
              style: { "--trigger-width": menuWidth } as React.CSSProperties
            }
          ],
          [
            ListBoxContext,
            {
              state,
              [slotCallbackSymbol]: setListBoxProps,
              ...listBoxProps,
              ref: listBoxRef,
              className: "combobox-list"
            }
          ]
        ]}
      >
        <div
          {...DOMProps}
          {...renderProps}
          ref={ref}
          slot={props.slot}
          data-focused={state.isFocused || undefined}
          data-open={state.isOpen || undefined}
        />
        {portal}
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
 * A combo box combines a text input with a listbox, allowing users to filter a list of options to items matching a query.
 */
const _ComboBox = /*#__PURE__*/ (forwardRef as forwardRefType)(ComboBox)
export { _ComboBox as ComboBox }
