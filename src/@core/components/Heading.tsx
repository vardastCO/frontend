"use client"

import { ContextValue, useContextProps } from "@core/utils/react-aria-utils"
import {
  ElementType,
  ForwardedRef,
  HTMLAttributes,
  createContext,
  forwardRef
} from "react"

export interface HeadingProps extends HTMLAttributes<HTMLElement> {
  level?: number
}

export const HeadingContext = createContext<
  ContextValue<HeadingProps, HTMLHeadingElement>
>({})

function Heading(props: HeadingProps, ref: ForwardedRef<HTMLHeadingElement>) {
  ;[props, ref] = useContextProps(props, ref, HeadingContext)
  let { children, level = 3, className, ...domProps } = props
  let Element = `h${level}` as ElementType

  return (
    <Element {...domProps} className={className ?? "react-aria-Heading"}>
      {children}
    </Element>
  )
}

const _Heading = forwardRef(Heading)
export { _Heading as Heading }
