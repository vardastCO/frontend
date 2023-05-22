"use client"

import { ContextValue, useContextProps } from "@core/utils/react-aria-utils"
import { ForwardedRef, HTMLAttributes, createContext, forwardRef } from "react"
import { useShallowRender } from "./Collection"

export const HeaderContext = createContext<
  ContextValue<HTMLAttributes<HTMLElement>, HTMLElement>
>({})

function Header(
  props: HTMLAttributes<HTMLElement>,
  ref: ForwardedRef<HTMLElement>
) {
  ;[props, ref] = useContextProps(props, ref, HeaderContext)
  let shallow = useShallowRender("header", props, ref)
  if (shallow) {
    return shallow
  }

  return (
    <header className="react-aria-Header" {...props} ref={ref}>
      {props.children}
    </header>
  )
}

const _Header = forwardRef(Header)
export { _Header as Header }
