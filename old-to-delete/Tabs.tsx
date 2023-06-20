"use client"

import {
  ContextValue,
  forwardRefType,
  RenderProps,
  SlotProps,
  StyleRenderProps,
  useContextProps,
  useRenderProps
} from "@core/utils/react-aria-utils"
import { filterDOMProps, useObjectRef } from "@react-aria/utils"
import { AriaLabelingProps } from "@react-types/shared"
import React, {
  createContext,
  ForwardedRef,
  forwardRef,
  Key,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"
import {
  AriaTabListProps,
  AriaTabPanelProps,
  mergeProps,
  Orientation,
  useFocusRing,
  useHover,
  useTab,
  useTabList,
  useTabPanel
} from "react-aria"
import { Node, TabListState, useTabListState } from "react-stately"
import { CollectionProps, Item, useCollection } from "./Collection"

export interface TabsProps extends RenderProps<TabsRenderProps>, SlotProps {
  /**
   * The orientation of the tabs.
   * @default 'horizontal'
   */
  orientation?: Orientation
}

export interface TabsRenderProps {
  /**
   * The orientation of the tabs.
   * @selector [data-orientation="horizontal | vertical"]
   */
  orientation: Orientation
}

export interface TabListProps<T>
  extends Omit<AriaTabListProps<T>, "children" | "orientation">,
    StyleRenderProps<TabListRenderProps>,
    AriaLabelingProps,
    CollectionProps<T> {}

export interface TabListRenderProps {
  /**
   * The orientation of the tab list.
   * @selector [aria-orientation="horizontal | vertical"]
   */
  orientation: Orientation
}

export interface TabProps
  extends RenderProps<TabRenderProps>,
    AriaLabelingProps {
  id?: Key
}

export interface TabRenderProps {
  /**
   * Whether the tab is currently hovered with a mouse.
   * @selector [data-hovered]
   */
  isHovered: boolean
  /**
   * Whether the tab is currently in a pressed state.
   * @selector [data-pressed]
   */
  isPressed: boolean
  /**
   * Whether the tab is currently selected.
   * @selector [aria-selected=true]
   */
  isSelected: boolean
  /**
   * Whether the tab is currently focused.
   * @selector :focus
   */
  isFocused: boolean
  /**
   * Whether the tab is currently keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean
  /**
   * Whether the tab is disabled.
   * @selector [aria-disabled]
   */
  isDisabled: boolean
}

export interface TabPanelProps
  extends AriaTabPanelProps,
    RenderProps<TabPanelRenderProps> {}
export interface TabPanelRenderProps {
  /**
   * Whether the tab panel is currently focused.
   * @selector :focus
   */
  isFocused: boolean
  /**
   * Whether the tab panel is currently keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean
}

interface InternalTabsContextValue {
  state: TabListState<unknown> | null
  setState: React.Dispatch<React.SetStateAction<TabListState<unknown> | null>>
  orientation: Orientation
}

export const TabsContext =
  createContext<ContextValue<TabsProps, HTMLDivElement>>(null)
const InternalTabsContext = createContext<InternalTabsContextValue | null>(null)

function Tabs(props: TabsProps, ref: ForwardedRef<HTMLDivElement>) {
  ;[props, ref] = useContextProps(props, ref, TabsContext)
  let { orientation = "horizontal" } = props
  let values = useMemo(() => ({ orientation }), [orientation])
  let [state, setState] = useState<TabListState<unknown> | null>(null)

  let renderProps = useRenderProps({
    ...props,
    defaultClassName: "tabs",
    values
  })

  return (
    <div
      {...filterDOMProps(props as any)}
      {...renderProps}
      ref={ref}
      slot={props.slot}
      data-orientation={orientation}
    >
      <InternalTabsContext.Provider value={{ state, setState, orientation }}>
        {renderProps.children}
      </InternalTabsContext.Provider>
    </div>
  )
}

/**
 * Tabs organize content into multiple sections and allow users to navigate between them.
 */
const _Tabs = forwardRef(Tabs)
export { _Tabs as Tabs }
export { _TabList as TabList }
export { _Tab as Tab }
export { _TabPanel as TabPanel }

function TabList<T extends object>(
  props: TabListProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  let { setState, orientation } = useContext(InternalTabsContext)!
  let objectRef = useObjectRef(ref)

  let { portal, collection } = useCollection(props)
  let state = useTabListState({
    ...props,
    collection,
    children: undefined
  })

  let { tabListProps } = useTabList(
    {
      ...props,
      orientation
    },
    state,
    objectRef
  )

  useEffect(() => {
    setState(state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, state.selectedKey])

  let renderProps = useRenderProps({
    ...props,
    children: null,
    defaultClassName: "tab-list",
    values: {
      orientation
    }
  })

  let DOMProps = filterDOMProps(props)
  delete DOMProps.id

  return (
    <>
      <div {...DOMProps} {...tabListProps} ref={objectRef} {...renderProps}>
        {/* @ts-ignore */}
        {[...state.collection].map((item) => (
          <TabInner key={item.key} item={item} state={state} />
        ))}
      </div>
      {portal}
    </>
  )
}

/**
 * A TabList is used within Tabs to group tabs that a user can switch between.
 * The ids of the items within the <TabList> must match up with a corresponding item inside the <TabPanels>.
 */
const _TabList = /*#__PURE__*/ (forwardRef as forwardRefType)(TabList)

function Tab(props: TabProps, ref: ForwardedRef<HTMLDivElement>) {
  // @ts-ignore
  return <Item {...props} ref={ref} />
}

/**
 * A Tab provides a title for an individual item within a TabList.
 */
const _Tab = forwardRef(Tab)

function TabInner({
  item,
  state
}: {
  item: Node<object>
  state: TabListState<object>
}) {
  let { key } = item
  let ref = useObjectRef<HTMLDivElement>(item.props.ref)
  let { tabProps, isSelected, isDisabled, isPressed } = useTab(
    { key },
    state,
    ref
  )
  let { focusProps, isFocused, isFocusVisible } = useFocusRing()
  let { hoverProps, isHovered } = useHover({
    isDisabled
  })

  let renderProps = useRenderProps({
    ...item.props,
    children: item.rendered,
    defaultClassName: "tab",
    values: {
      isSelected,
      isDisabled,
      isFocused,
      isFocusVisible,
      isPressed,
      isHovered
    }
  })

  let DOMProps = filterDOMProps(item.props)
  delete DOMProps.id

  return (
    <div
      {...mergeProps(DOMProps, tabProps, focusProps, hoverProps, renderProps)}
      ref={ref}
      data-focus-visible={isFocusVisible || undefined}
      data-pressed={isPressed || undefined}
      data-hovered={isHovered || undefined}
    />
  )
}

export interface TabPanelsProps<T>
  extends Omit<CollectionProps<T>, "disabledKeys"> {}

/**
 * TabPanels is used within Tabs as a container for the content of each tab.
 * The ids of the items within the <TabPanels> must match up with a corresponding item inside the <TabList>.
 */
export function TabPanels<T extends object>(props: TabPanelsProps<T>) {
  const { state } = useContext(InternalTabsContext)!
  let { portal, collection } = useCollection(props)
  const selectedItem =
    state?.selectedKey != null ? collection.getItem(state!.selectedKey) : null

  return (
    <>
      {selectedItem && <SelectedTabPanel item={selectedItem} />}
      {portal}
    </>
  )
}

function TabPanel(props: TabPanelProps, ref: ForwardedRef<HTMLDivElement>) {
  return <Item {...props} ref={ref} />
}

/**
 * A TabPanel provides the content for a tab.
 */
const _TabPanel = forwardRef(TabPanel)

function SelectedTabPanel({ item }: { item: Node<object> }) {
  const { state } = useContext(InternalTabsContext)!
  let ref = useObjectRef<HTMLDivElement>(item.props.ref)
  let { tabPanelProps } = useTabPanel(item.props, state!, ref)
  let { focusProps, isFocused, isFocusVisible } = useFocusRing()

  let renderProps = useRenderProps({
    ...item.props,
    children: item.rendered,
    defaultClassName: "tab-panel",
    values: {
      isFocused,
      isFocusVisible
    }
  })

  let DOMProps = filterDOMProps(item.props)
  delete DOMProps.id

  return (
    <div
      {...mergeProps(DOMProps, tabPanelProps, focusProps, renderProps)}
      ref={ref}
      data-focus-visible={isFocusVisible || undefined}
    />
  )
}
