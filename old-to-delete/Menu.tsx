"use client"

import {
  createContext,
  ForwardedRef,
  forwardRef,
  ReactNode,
  RefObject,
  useContext,
  useRef
} from "react"
import { filterDOMProps, mergeRefs, useObjectRef } from "@react-aria/utils"
import {
  AriaMenuProps,
  mergeProps,
  useFocusRing,
  useMenu,
  useMenuItem,
  useMenuSection,
  useMenuTrigger
} from "react-aria"
import {
  MenuTriggerProps as BaseMenuTriggerProps,
  Node,
  TreeState,
  useMenuTriggerState,
  useTreeState
} from "react-stately"

import {
  ContextValue,
  forwardRefType,
  Provider,
  SlotProps,
  StyleProps,
  useContextProps,
  useRenderProps,
  useSlot
} from "@core/utils/react-aria-utils"
import { ButtonContext } from "@core/components/ui/button"

import {
  BaseCollection,
  CollectionProps,
  ItemProps,
  ItemRenderProps,
  useCachedChildren,
  useCollection
} from "./Collection"
import { Header } from "./Header"
import { KeyboardContext } from "./Keyboard"
import { PopoverContext } from "./Popover"
import { Separator, SeparatorContext } from "./Separator"
import { TextContext } from "./Text"

export const MenuContext =
  createContext<ContextValue<MenuProps<any>, HTMLDivElement>>(null)
const InternalMenuContext = createContext<TreeState<unknown> | null>(null)

export interface MenuTriggerProps extends BaseMenuTriggerProps {
  children?: ReactNode
}

export function MenuTrigger(props: MenuTriggerProps) {
  let state = useMenuTriggerState(props)

  let ref = useRef<HTMLButtonElement>(null)
  let { menuTriggerProps, menuProps } = useMenuTrigger(
    {
      ...props,
      type: "menu"
    },
    state,
    ref
  )

  return (
    <Provider
      values={[
        [MenuContext, menuProps],
        [ButtonContext, { ...menuTriggerProps, ref, isPressed: state.isOpen }],
        [
          PopoverContext,
          {
            state,
            triggerRef: ref,
            placement: "bottom end",
            className: "dropdown-menu"
          }
        ]
      ]}
    >
      {props.children}
    </Provider>
  )
}

export interface MenuProps<T>
  extends Omit<AriaMenuProps<T>, "children">,
    CollectionProps<T>,
    StyleProps,
    SlotProps {}

function Menu<T extends object>(
  props: MenuProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  ;[props, ref] = useContextProps(props, ref, MenuContext)
  let { portal, collection } = useCollection(props)

  // Delay rendering the actual menu until we have the collection so that auto focus works properly.
  return (
    <>
      {collection.size > 0 && (
        <MenuInner props={props} collection={collection} menuRef={ref} />
      )}
      {portal}
    </>
  )
}

interface MenuInnerProps<T> {
  props: MenuProps<T>
  collection: BaseCollection<T>
  menuRef: RefObject<HTMLDivElement>
}

function MenuInner<T extends object>({
  props,
  collection,
  menuRef: ref
}: MenuInnerProps<T>) {
  let state = useTreeState({
    ...props,
    collection,
    children: undefined
  })
  let { menuProps } = useMenu(props, state, ref)

  let children = useCachedChildren({
    items: state.collection,
    children: (item) => {
      switch (item.type) {
        case "section":
          return <MenuSection section={item} />
        case "separator":
          return <Separator {...item.props} />
        case "item":
          return <MenuItem item={item} />
        default:
          throw new Error("Unsupported node type in Menu: " + item.type)
      }
    }
  })

  return (
    <div
      {...filterDOMProps(props)}
      {...menuProps}
      ref={ref}
      slot={props.slot}
      style={props.style}
      className={props.className ?? "dropdown-menu-inner"}
    >
      <Provider
        values={[
          [InternalMenuContext, state],
          [
            SeparatorContext,
            { elementType: "div", className: "dropdown-menu-separator" }
          ]
        ]}
      >
        {/* @ts-ignore */}
        {children}
      </Provider>
    </div>
  )
}

/**
 * A menu displays a list of actions or options that a user can choose.
 */
const _Menu = /*#__PURE__*/ (forwardRef as forwardRefType)(Menu)
export { _Menu as Menu }

interface MenuSectionProps<T> extends StyleProps {
  section: Node<T>
}

function MenuSection<T>({
  section,
  className,
  style,
  ...otherProps
}: MenuSectionProps<T>) {
  let state = useContext(InternalMenuContext)!
  let [headingRef, heading] = useSlot()
  let { headingProps, groupProps } = useMenuSection({
    heading,
    "aria-label": section["aria-label"] ?? undefined
  })

  let children = useCachedChildren({
    items: state.collection.getChildren!(section.key),
    children: (item) => {
      switch (item.type) {
        case "header": {
          let { ref, ...otherProps } = item.props
          return (
            <Header
              {...headingProps}
              {...otherProps}
              ref={mergeRefs(headingRef, ref)}
            >
              {item.rendered}
            </Header>
          )
        }
        case "item":
          return <MenuItem item={item} />
        default:
          throw new Error("Unsupported element type in Section: " + item.type)
      }
    }
  })

  return (
    <section
      {...filterDOMProps(otherProps)}
      {...groupProps}
      className={
        className || section.props?.className || "dropdown-menu-section"
      }
      style={style || section.props?.style}
      ref={section.props.ref}
    >
      {/* @ts-ignore */}
      {children}
    </section>
  )
}

export interface MenuItemRenderProps extends ItemRenderProps {
  /**
   * Whether the item is currently selected.
   * @selector [aria-checked=true]
   */
  isSelected: boolean
}

interface MenuItemProps<T> {
  item: Node<T>
}

function MenuItem<T>({ item }: MenuItemProps<T>) {
  let state = useContext(InternalMenuContext)!
  let ref = useObjectRef<HTMLDivElement>(item.props.ref)
  let {
    menuItemProps,
    labelProps,
    descriptionProps,
    keyboardShortcutProps,
    ...states
  } = useMenuItem({ key: item.key }, state, ref)

  let props: ItemProps<T> = item.props
  let { isFocusVisible, focusProps } = useFocusRing()
  let renderProps = useRenderProps({
    ...props,
    id: undefined,
    children: item.rendered,
    className: `dropdown-menu-item ${props.className}`,
    values: {
      ...states,
      isHovered: states.isFocused,
      isFocusVisible,
      selectionMode: state.selectionManager.selectionMode,
      selectionBehavior: state.selectionManager.selectionBehavior
    }
  })

  let DOMProps = filterDOMProps(props as any)
  delete DOMProps.id

  return (
    <div
      {...mergeProps(DOMProps, menuItemProps, focusProps)}
      {...renderProps}
      ref={ref}
      data-hovered={states.isFocused || undefined}
      data-focused={states.isFocused || undefined}
      data-focus-visible={isFocusVisible || undefined}
      data-pressed={states.isPressed || undefined}
    >
      <Provider
        values={[
          [
            TextContext,
            {
              slots: {
                label: labelProps,
                description: descriptionProps
              }
            }
          ],
          [KeyboardContext, keyboardShortcutProps]
        ]}
      >
        {renderProps.children}
      </Provider>
    </div>
  )
}
