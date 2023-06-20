"use client"

import { ContextValue, useContextProps } from "@core/utils/react-aria-utils"
import {
  ForwardedRef,
  LabelHTMLAttributes,
  createContext,
  forwardRef
} from "react"

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  elementType?: string
}

export const LabelContext = createContext<
  ContextValue<LabelProps, HTMLLabelElement>
>({})

function Label(props: LabelProps, ref: ForwardedRef<HTMLLabelElement>) {
  ;[props, ref] = useContextProps(props, ref, LabelContext)
  let { elementType: ElementType = "label", ...labelProps } = props
  // @ts-ignore
  return <ElementType className="form-label" {...labelProps} ref={ref} />
}

const _Label = forwardRef(Label)
export { _Label as Label }
