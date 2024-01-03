import React, { CSSProperties, ReactElement, ReactNode, useState } from "react"
import clsx from "clsx"

interface SegmentsProps {
  children: ReactNode
  defaultValue?: string
  value?: string
  className?: string
  onValueChange?: (_: string) => void
  style?: CSSProperties | undefined
}

interface SegmentsListProps {
  children: ReactNode
  className?: string
  style?: CSSProperties | undefined
}

interface SegmentsListItemProps {
  value: string
  children?: ((_: { isSelected: boolean }) => React.ReactNode) | React.ReactNode
}

interface SegmentsContentProps {
  value: string
  children: ReactNode
}

const Segments: React.FC<SegmentsProps> = ({ children, ...props }) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    props.defaultValue || ""
  )

  const handleSegmentChange = (value: string) => {
    if (props.onValueChange) {
      return props.onValueChange(value)
    }
    setSelectedValue(value)
  }

  return (
    <div
      className={clsx("overflow-hidden", props.className)}
      style={props.style}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === SegmentsList) {
            return React.cloneElement(child as ReactElement<any>, {
              selectedValue: props.value ?? selectedValue,
              onSegmentChange: handleSegmentChange
            })
          } else if (child.type === SegmentsContent) {
            return React.cloneElement(child as ReactElement<any>, {
              isVisible: child.props.value === props.value ?? selectedValue
            })
          } else {
            return child
          }
        }
        return null
      })}
    </div>
  )
}

const SegmentsList: React.FC<
  SegmentsListProps & {
    selectedValue?: string
    onSegmentChange?: (_: string) => void
  }
> = ({ children, selectedValue, onSegmentChange, style, className }) => {
  return (
    <div
      className={clsx(
        "hide-scrollbar relative flex w-full items-center overflow-x-scroll whitespace-nowrap",
        className
      )}
      style={style}
    >
      {/* <div className="fixed bottom-0 left-0 z-20 h-5 w-36 bg-opacity-30 bg-gradient-to-r from-alpha-white"></div> */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === SegmentsListItem) {
            return React.cloneElement(child as ReactElement<any>, {
              isSelected: child.props.value === selectedValue,
              onClick: () =>
                onSegmentChange && onSegmentChange(child.props.value)
            })
          } else {
            return child
          }
        }
        return null
      })}
    </div>
  )
}

const SegmentsListItem: React.FC<
  SegmentsListItemProps & {
    isSelected?: boolean
    onClick?: () => void
    className?: string
    style?: CSSProperties | undefined
    noStyle?: boolean
  }
> = ({ noStyle, isSelected, className, onClick, style, children }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "relative inline-block w-auto",
        !noStyle &&
          (isSelected
            ? "mx-1 cursor-pointer rounded-full border border-primary bg-primary text-alpha-white"
            : "mx-1 cursor-pointer rounded-full border border-alpha-300"),
        className
      )}
      style={style}
    >
      {React.Children.map(children as ReactNode, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === SegmentsListItem) {
            return React.cloneElement(child as ReactElement, {
              isSelected
            })
          } else {
            return React.cloneElement(child as ReactElement, {
              isSelected
            })
          }
        }

        return null
      })}
    </div>
  )
}

const SegmentsContent: React.FC<
  SegmentsContentProps & {
    isVisible?: boolean
    className?: string
    style?: CSSProperties | undefined
  }
> = ({ isVisible, style, className, children }) => {
  return isVisible ? (
    <div style={style} className={className}>
      {children}
    </div>
  ) : null
}

export { Segments, SegmentsContent, SegmentsList, SegmentsListItem }
