export interface IGeolocation {
  id: number
  name: string
  slug: string
  parent: number
  relativeChildren: number[] | null
  isProvince: boolean | null
  children: IGeolocation[] | null
}
