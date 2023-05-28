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
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState
} from "react"
import { AriaSelectProps, HiddenSelect, useSelect } from "react-aria"
import { SelectState, useSelectState } from "react-stately"
import { ButtonContext } from "./Button"
import { ItemRenderProps, useCollection } from "./Collection"
import { LabelContext } from "./Label"
import { ListBoxContext, ListBoxProps } from "./ListBox"
import { PopoverContext } from "./Popover"
import { TextContext } from "./Text"

export interface SelectRenderProps {
  /**
   * Whether the select is focused, either via a mouse or keyboard.
   * @selector [data-focused]
   */
  isFocused: boolean
  /**
   * Whether the select is currently open.
   * @selector [data-open]
   */
  isOpen: boolean
}

export interface SelectProps<T extends object>
  extends Omit<
      AriaSelectProps<T>,
      "children" | "label" | "description" | "errorMessage"
    >,
    RenderProps<SelectRenderProps>,
    SlotProps {}

interface SelectValueContext {
  state: SelectState<unknown>
  valueProps: HTMLAttributes<HTMLElement>
  placeholder?: string
}

export const SelectContext =
  createContext<ContextValue<SelectProps<any>, HTMLDivElement>>(null)
const InternalSelectContext = createContext<SelectValueContext | null>(null)

function Select<T extends object>(
  props: SelectProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  ;[props, ref] = useContextProps(props, ref, SelectContext)
  let [listBoxProps, setListBoxProps] = useState<ListBoxProps<any>>({
    children: []
  })

  let { portal, collection } = useCollection({
    items: props.items ?? listBoxProps.items,
    children: listBoxProps.children
  })
  let state = useSelectState({
    ...props,
    collection,
    children: undefined
  })

  // Only expose a subset of state to renderProps function to avoid infinite render loop
  let renderPropsState = useMemo(
    () => ({ isOpen: state.isOpen, isFocused: state.isFocused }),
    [state.isOpen, state.isFocused]
  )

  // Get props for child elements from useSelect
  let buttonRef = useRef<HTMLButtonElement>(null)
  let [labelRef, label] = useSlot()
  let {
    labelProps,
    triggerProps,
    valueProps,
    menuProps,
    descriptionProps,
    errorMessageProps
  } = useSelect({ ...props, label }, state, buttonRef)

  // Make menu width match input + button
  let [buttonWidth, setButtonWidth] = useState<string | null>(null)
  let onResize = useCallback(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth + "px")
    }
  }, [buttonRef])

  useResizeObserver({
    ref: buttonRef,
    onResize: onResize
  })

  let renderProps = useRenderProps({
    ...props,
    values: renderPropsState,
    defaultClassName: "react-aria-Select"
  })

  let DOMProps = filterDOMProps(props)
  delete DOMProps.id

  return (
    <Provider
      values={[
        [
          InternalSelectContext,
          { state, valueProps, placeholder: props.placeholder }
        ],
        [LabelContext, { ...labelProps, ref: labelRef, elementType: "span" }],
        [
          ButtonContext,
          { ...triggerProps, ref: buttonRef, isPressed: state.isOpen }
        ],
        [
          PopoverContext,
          {
            state,
            triggerRef: buttonRef,
            preserveChildren: true,
            placement: "bottom start",
            style: { "--trigger-width": buttonWidth } as React.CSSProperties
          }
        ],
        [
          ListBoxContext,
          { state, [slotCallbackSymbol]: setListBoxProps, ...menuProps }
        ],
        [
          TextContext,
          {
            slots: {
              description: descriptionProps,
              errorMessage: errorMessageProps
            }
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
      <HiddenSelect
        state={state}
        triggerRef={buttonRef}
        label={label}
        name={props.name}
      />
    </Provider>
  )
}

/**
 * A select displays a collapsible list of options and allows a user to select one of them.
 */
const _Select = /*#__PURE__*/ (forwardRef as forwardRefType)(Select)
export { _Select as Select }
export { _SelectValue as SelectValue }

export interface SelectValueRenderProps<T> {
  /**
   * Whether the value is a placeholder.
   * @selector [data-placeholder]
   */
  isPlaceholder: boolean
  /** The object value of the currently selected item. */
  selectedItem: T | null
  /** The textValue of the currently selected item. */
  selectedText: string | null
}

export interface SelectValueProps<T extends object>
  extends Omit<HTMLAttributes<HTMLElement>, keyof RenderProps<unknown>>,
    RenderProps<SelectValueRenderProps<T>> {}

function SelectValue<T extends object>(
  props: SelectValueProps<T>,
  ref: ForwardedRef<HTMLSpanElement>
) {
  let { state, valueProps, placeholder } = useContext(InternalSelectContext)!
  let rendered = state.selectedItem?.rendered
  if (typeof rendered === "function") {
    // If the selected item has a function as a child, we need to call it to render to JSX.
    let fn = rendered as (s: ItemRenderProps) => ReactNode
    rendered = fn({
      isHovered: false,
      isPressed: false,
      isSelected: false,
      isFocused: false,
      isFocusVisible: false,
      isDisabled: false,
      selectionMode: "single",
      selectionBehavior: "toggle"
    })
  }

  let renderProps = useRenderProps({
    ...props,
    // TODO: localize this.
    defaultChildren: rendered || placeholder || "Select an item",
    defaultClassName: "react-aria-SelectValue",
    values: {
      selectedItem: (state.selectedItem?.value as T) ?? null,
      selectedText: state.selectedItem?.textValue ?? null,
      isPlaceholder: !state.selectedItem
    }
  })

  let DOMProps = filterDOMProps(props)
  delete DOMProps.id

  return (
    <span
      ref={ref}
      {...DOMProps}
      {...valueProps}
      {...renderProps}
      data-placeholder={!state.selectedItem || undefined}
    >
      {/* clear description and error message slots */}
      <TextContext.Provider value={undefined}>
        {renderProps.children}
      </TextContext.Provider>
    </span>
  )
}

/**
 * SelectValue renders the current value of a Select, or a placeholder if no value is selected.
 * It is usually placed within the button element.
 */
const _SelectValue = /*#__PURE__*/ (forwardRef as forwardRefType)(SelectValue)
