import { IResponse } from "@core/types/IResponse"

export interface IHomeGetRequest {}

export type IHomeGetResponse = IResponse<{
  bannerData: {
    id: number
    uuid: string
    modelType: "Image"
    name: string
    url: string
  }[]
}>
