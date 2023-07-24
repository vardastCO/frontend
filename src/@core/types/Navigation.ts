import dynamicIconImports from "lucide-react/dynamicIconImports"

export interface NavigationItemType {
  title: string
  path: string
  icon: keyof typeof dynamicIconImports
  items?: NavigationItemType[]
}

export interface NavigationType {
  title?: string
  items: NavigationItemType[]
}
