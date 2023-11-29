import { BaseService, GET, Header } from "ts-retrofit"

import httpService from "@core/Services/_config/httpService"
import { IHomeGetResponse } from "@core/Services/Home/model"

class Home extends BaseService {
  @GET("/base/storage/file")
  async getFiles(
    @Header("Authorization") _authorization: string
  ): Promise<IHomeGetResponse> {
    return <IHomeGetResponse>{}
  }
}

export default httpService.build(Home)
