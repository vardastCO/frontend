"use client"

import type { AriaToastProps } from "@react-aria/toast"
import { useToast } from "@react-aria/toast"
import { ToastQueue, ToastState, useToastQueue } from "@react-stately/toast"
import { useRef } from "react"

import type { AriaToastRegionProps } from "@react-aria/toast"
import { useToastRegion } from "@react-aria/toast"
import { IconX } from "@tabler/icons-react"
import { cva } from "class-variance-authority"
import { createPortal } from "react-dom"
import { Button } from "./Button"

const toastClasses = cva("toast", {
  variants: {
    intent: {
      DEFAULT: "",
      success: "toast-success",
      danger: "toast-danger",
      warning: "toast-warning",
      info: "toast-info"
    },
    position: {
      "top-right": "toast-top-right",
      "top-center": "toast-top-center",
      "top-left": "toast-top-left",
      "bottom-right": "toast-bottom-right",
      "bottom-center": "toast-bottom-center",
      "bottom-left": "toast-bottom-left"
    }
  },
  compoundVariants: [
    {
      intent: "DEFAULT",
      position: "bottom-left"
    }
  ],
  defaultVariants: {
    intent: "DEFAULT",
    position: "bottom-left"
  }
})

export const toastQueue = new ToastQueue({
  maxVisibleToasts: 5
})

export function GlobalToastRegion(props) {
  // Subscribe to it.
  let state = useToastQueue(toastQueue)

  // Render toast region.
  return state.visibleToasts.length > 0
    ? createPortal(<ToastRegion {...props} state={state} />, document.body)
    : null
}

interface ToastRegionProps<T> extends AriaToastRegionProps {
  state: ToastState<T>
}

export function ToastRegion<T>({ state, ...props }: ToastRegionProps<T>) {
  let ref = useRef(null)
  let { regionProps } = useToastRegion(props, state, ref)

  return (
    <div {...regionProps} ref={ref} className="toast-region">
      {state.visibleToasts.map((toast) => (
        <Toast key={toast.key} toast={toast} state={state} />
      ))}
    </div>
  )
}

interface ToastProps<T> extends AriaToastProps<T> {
  state: ToastState<T>
}

export function Toast<T>({ state, ...props }: ToastProps<T>) {
  let ref = useRef(null)
  let { toastProps, titleProps, closeButtonProps } = useToast(props, state, ref)
  return (
    <div
      {...toastProps}
      ref={ref}
      className={toastClasses({
        position: props.toast.position,
        intent: props.toast.intent
      })}
    >
      <div {...titleProps}>{props.toast.content}</div>
      <Button intent="ghost" className="close-button" {...closeButtonProps}>
        <IconX />
      </Button>
    </div>
  )
}
