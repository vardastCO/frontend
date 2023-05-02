import { VariantProps, cva } from "class-variance-authority"
import { ReactNode, cloneElement, useRef } from "react"
import {
  AriaModalOverlayProps,
  Overlay,
  useModalOverlay,
  useOverlayTrigger
} from "react-aria"
import {
  OverlayTriggerProps,
  OverlayTriggerState,
  useOverlayTriggerState
} from "react-stately"
import { Button } from "./Button"

const dialog = cva("dialog", {
  variants: {
    size: {
      small: "dialog-sm",
      DEFAULT: "",
      medium: "dialog-md",
      large: "dialog-lg",
      xlarge: "dialog-xl"
    }
  },
  defaultVariants: {
    size: "DEFAULT"
  }
})

interface ModalProps
  extends AriaModalOverlayProps,
    VariantProps<typeof dialog> {
  state: OverlayTriggerState
  children: ReactNode
  className?: string
}

export const Modal = ({
  state,
  children,
  size,
  className,
  ...props
}: ModalProps) => {
  let ref = useRef(null)
  let { modalProps, underlayProps } = useModalOverlay(props, state, ref)

  return (
    <Overlay>
      <div className={dialog({ size, className })}>
        <div className="dialog-overlay" {...underlayProps}>
          <div {...modalProps} ref={ref} className="dialog-container">
            <div className="dialog-inner">{children}</div>
          </div>
        </div>
      </div>
    </Overlay>
  )
}

interface ModalTriggerProps extends AriaModalOverlayProps {
  label: ReactNode
  children: Function
}

export const ModalTrigger = ({
  label,
  children,
  ...props
}: ModalTriggerProps) => {
  let state = useOverlayTriggerState(props as OverlayTriggerProps)
  let { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state
  )

  return (
    <>
      <Button {...triggerProps}>{label}</Button>
      {state.isOpen && (
        <Modal {...props} state={state}>
          {cloneElement(children(state.close), overlayProps)}
        </Modal>
      )}
    </>
  )
}
