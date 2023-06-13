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
import { IconSelector } from "@tabler/icons-react"
import { VariantProps, cva } from "class-variance-authority"
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
import { Button } from "./Button"
import { ItemRenderProps, useCollection } from "./Collection"
import { Label } from "./Label"
import { ListBoxContext, ListBoxProps } from "./ListBox"
import { PopoverContext } from "./Popover"
import { TextContext } from "./Text"

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
  extends Omit<AriaSelectProps<T>, "children">,
    RenderProps<SelectRenderProps>,
    VariantProps<typeof formControlClasses>,
    SlotProps {
  prefixAddon?: ReactNode
  suffixAddon?: ReactNode
  prefixElement?: ReactNode
  suffixElement?: ReactNode
}

interface SelectValueContext {
  state: SelectState<unknown>
  valueProps: HTMLAttributes<HTMLElement>
  placeholder?: string
}

export const SelectContext =
  createContext<ContextValue<SelectProps<any>, HTMLDivElement>>(null)
const InternalSelectContext = createContext<SelectValueContext | null>(null)

function Select<T extends object>(
  {
    prefixAddon,
    suffixAddon,
    prefixElement,
    suffixElement,
    inputSize,
    rounded,
    plaintext,
    ...props
  }: SelectProps<T>,
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
    <div className="form-field">
      <Label {...labelProps} ref={labelRef}>
        {props.label}
      </Label>
      <Button
        noStyle
        {...triggerProps}
        ref={buttonRef}
        className={`appreance-none text-start ${formControlClasses({
          inputSize,
          rounded,
          plaintext
        })}`}
      >
        <div className="input-group">
          {prefixAddon && <div className="input-addon">{prefixAddon}</div>}
          <div className="input-inset">
            {prefixElement && (
              <div className="input-element">{prefixElement}</div>
            )}
            <div className="input-field !cursor-pointer" {...valueProps}>
              {state.selectedItem
                ? (state.selectedItem.rendered as string)
                : props.placeholder}
            </div>
            <div className="input-element">
              <IconSelector className="icon" />
              {suffixElement && suffixElement}
            </div>
          </div>
          {suffixAddon && <div className="input-addon">{suffixAddon}</div>}
        </div>
      </Button>
      <Provider
        values={[
          //   [
          //     InternalSelectContext,
          //     { state, valueProps, placeholder: props.placeholder }
          //   ],
          //   [
          //     ButtonContext,
          //     { ...triggerProps, ref: buttonRef, isPressed: state.isOpen }
          //   ],
          [
            PopoverContext,
            {
              state,
              triggerRef: buttonRef,
              preserveChildren: true,
              placement: "bottom end",
              className: "combobox-list-container",
              style: { "--trigger-width": buttonWidth } as React.CSSProperties
            }
          ],
          [
            ListBoxContext,
            {
              state,
              [slotCallbackSymbol]: setListBoxProps,
              ...menuProps,
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
        <HiddenSelect
          state={state}
          triggerRef={buttonRef}
          label={label}
          name={props.name}
        />
      </Provider>
    </div>
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
