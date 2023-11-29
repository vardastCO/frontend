import { RequestInterceptorFunction } from "ts-retrofit"

const httpServiceRequestInterceptor: RequestInterceptorFunction = (config) => {
  if (config.headers?.serverAuthorization) {
    config.headers.Authorization = `Bearer ${config.headers.serverAuthorization}`
  }
  return config
}

export default httpServiceRequestInterceptor
