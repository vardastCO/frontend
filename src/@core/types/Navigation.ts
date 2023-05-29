export interface NavigationItemType {
    title: string
    path: string
    icon: string
}

export interface NavigationType {
    title?: string
    items: NavigationItemType[]
}
