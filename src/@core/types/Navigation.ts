export interface NavigationItemType {
    title: string
    path: string
    icon: string
    items?: NavigationItemType[]
}

export interface NavigationType {
    title?: string
    items: NavigationItemType[]
}
