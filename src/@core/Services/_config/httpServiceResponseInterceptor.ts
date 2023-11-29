import { ResponseInterceptorFunction } from "ts-retrofit"

import { IResponse } from "@core/types/IResponse"

const httpServiceResponseInterceptor: ResponseInterceptorFunction<IResponse> = (
  config
) => {
  return Promise.resolve(config)
}

export default httpServiceResponseInterceptor
