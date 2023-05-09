import { VariantProps, cva } from "class-variance-authority"
import { ComponentProps, ReactNode } from "react"
import { Modal as AriaModal, ModalOverlay } from "react-aria-components"

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

interface ModalProps
  extends ComponentProps<typeof AriaModal>,
    VariantProps<typeof modalClasses> {
  className?: string
}

export const Modal = ({ children, size, className }: ModalProps) => {
  return (
    <ModalOverlay className={modalClasses({ className, size })}>
      <div className="modal-overlay">
        <AriaModal className="modal-container">{children}</AriaModal>
      </div>
    </ModalOverlay>
  )
}

interface ModalFooterProps {
  children: ReactNode
}

export const ModalFooter = ({ children }: ModalFooterProps) => {
  return <div className="modal-footer">{children}</div>
}

interface ModalContentProps {
  children: ReactNode
}

export const ModalContent = ({ children }: ModalContentProps) => {
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
