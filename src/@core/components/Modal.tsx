"use client"

import {
  RenderProps,
  useEnterAnimation,
  useExitAnimation,
  useRenderProps
} from "@core/utils/react-aria-utils"
import {
  filterDOMProps,
  mergeProps,
  mergeRefs,
  useObjectRef,
  useViewportSize
} from "@react-aria/utils"
import { DOMAttributes } from "@react-types/shared"
import { VariantProps, cva } from "class-variance-authority"
import {
  ForwardedRef,
  ReactNode,
  RefObject,
  createContext,
  forwardRef,
  useContext,
  useMemo,
  useRef
} from "react"
import {
  AriaModalOverlayProps,
  DismissButton,
  Overlay,
  useModalOverlay
} from "react-aria"
import {
  OverlayTriggerProps,
  OverlayTriggerState,
  useOverlayTriggerState
} from "react-stately"

const modalClasses = cva("modal", {
  variants: {
    size: {
      small: "modal-sm",
      DEFAULT: "",
      medium: "modal-md",
      large: "modal-lg",
      xlarge: "modal-xl"
    }
  },
  defaultVariants: {
    size: "DEFAULT"
  }
})

export interface ModalOverlayProps
  extends AriaModalOverlayProps,
    OverlayTriggerProps,
    VariantProps<typeof modalClasses>,
    RenderProps<ModalRenderProps> {}

interface ModalContextValue {
  state?: OverlayTriggerState
}

interface InternalModalContextValue {
  modalProps: DOMAttributes
  modalRef: RefObject<HTMLDivElement>
  isExiting: boolean
  isDismissable?: boolean
  state: OverlayTriggerState
}

export const ModalContext = createContext<ModalContextValue | null>(null)
const InternalModalContext = createContext<InternalModalContextValue | null>(
  null
)

export interface ModalRenderProps {
  /**
   * Whether the modal is currently entering. Use this to apply animations.
   * @selector [data-entering]
   */
  isEntering: boolean
  /**
   * Whether the modal is currently exiting. Use this to apply animations.
   * @selector [data-exiting]
   */
  isExiting: boolean
}

function Modal(
  { size, className, ...props }: ModalOverlayProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  let ctx = useContext(InternalModalContext)

  if (ctx) {
    return (
      <ModalContent {...props} modalRef={ref}>
        {props.children}
      </ModalContent>
    )
  }

  let {
    isDismissable,
    isKeyboardDismissDisabled,
    isOpen,
    defaultOpen,
    onOpenChange,
    children,
    ...otherProps
  } = props

  return (
    <ModalOverlay
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      isOpen={isOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      className={modalClasses({ className, size })}
    >
      <div className="modal-overlay">
        <ModalContent
          className="modal-container"
          {...otherProps}
          modalRef={ref}
        >
          {children}
        </ModalContent>
      </div>
    </ModalOverlay>
  )
}

interface ModalOverlayInnerProps extends ModalOverlayProps {
  overlayRef: RefObject<HTMLDivElement>
  modalRef: RefObject<HTMLDivElement>
  state: OverlayTriggerState
  isExiting: boolean
}

/**
 * A modal is an overlay element which blocks interaction with elements outside it.
 */
const _Modal = forwardRef(Modal)
export { _Modal as Modal }

/**
 * A ModalOverlay is a wrapper for a Modal which allows customizing the backdrop element.
 */
// eslint-disable-next-line react/display-name
export const ModalOverlay = forwardRef(
  (props: ModalOverlayProps, ref: ForwardedRef<HTMLDivElement>) => {
    let ctx = useContext(ModalContext)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let state = ctx?.state ?? useOverlayTriggerState(props)

    let objectRef = useObjectRef(ref)
    let modalRef = useRef<HTMLDivElement>(null)
    let isOverlayExiting = useExitAnimation(objectRef, state.isOpen)
    let isModalExiting = useExitAnimation(modalRef, state.isOpen)
    let isExiting = isOverlayExiting || isModalExiting

    if (!state.isOpen && !isExiting) {
      return null
    }

    return (
      <ModalOverlayInner
        {...props}
        state={state}
        isExiting={isExiting}
        overlayRef={objectRef}
        modalRef={modalRef}
      />
    )
  }
)

function ModalOverlayInner(props: ModalOverlayInnerProps) {
  let modalRef = props.modalRef
  let { state } = props
  let { modalProps, underlayProps } = useModalOverlay(props, state, modalRef)

  let entering = useEnterAnimation(props.overlayRef)
  let renderProps = useRenderProps({
    ...props,
    defaultClassName: "react-aria-ModalOverlay",
    values: {
      isEntering: entering,
      isExiting: props.isExiting
    }
  })

  let viewport = useViewportSize()
  let style = {
    ...renderProps.style,
    "--visual-viewport-height": viewport.height + "px"
  }

  return (
    <Overlay>
      <div
        {...mergeProps(filterDOMProps(props as any), underlayProps)}
        {...renderProps}
        style={style}
        ref={props.overlayRef}
        data-entering={entering || undefined}
        data-exiting={props.isExiting || undefined}
      >
        <InternalModalContext.Provider
          value={{
            modalProps,
            modalRef,
            state,
            isExiting: props.isExiting,
            isDismissable: props.isDismissable
          }}
        >
          {renderProps.children}
        </InternalModalContext.Provider>
      </div>
    </Overlay>
  )
}

interface ModalContentProps extends RenderProps<ModalRenderProps> {
  modalRef: ForwardedRef<HTMLDivElement>
}

function ModalContent(props: ModalContentProps) {
  let { modalProps, modalRef, isExiting, isDismissable, state } =
    useContext(InternalModalContext)!
  let mergedRefs = useMemo(
    () => mergeRefs(props.modalRef, modalRef),
    [props.modalRef, modalRef]
  )

  let ref = useObjectRef(mergedRefs)
  let entering = useEnterAnimation(ref)
  let renderProps = useRenderProps({
    ...props,
    defaultClassName: "react-aria-Modal",
    values: {
      isEntering: entering,
      isExiting
    }
  })

  return (
    <div
      {...mergeProps(filterDOMProps(props as any), modalProps)}
      {...renderProps}
      ref={ref}
      data-entering={entering || undefined}
      data-exiting={isExiting || undefined}
    >
      {isDismissable && <DismissButton onDismiss={state.close} />}
      {renderProps.children}
    </div>
  )
}

interface ModalFooterProps {
  children: ReactNode
}

export const ModalFooter = ({ children }: ModalFooterProps) => {
  return <div className="modal-footer">{children}</div>
}

interface ModalBodyProps {
  children: ReactNode
}

export const ModalBody = ({ children }: ModalBodyProps) => {
  return <div className="modal-content">{children}</div>
}

interface ModalHeaderProps {
  title: ReactNode
  description?: ReactNode
}

export const ModalHeader = ({ title, description }: ModalHeaderProps) => {
  {
    return (
      <div className="modal-header">
        {title && <h3 className="modal-title">{title}</h3>}
        {description && <p className="modal-description">{description}</p>}
      </div>
    )
  }
}
