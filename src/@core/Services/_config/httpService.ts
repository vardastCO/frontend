import axios from "axios"
import { ServiceBuilder } from "ts-retrofit"

import httpServiceRequestInterceptor from "@core/Services/_config/httpServiceRequestInterceptor"
import httpServiceResponseInterceptor from "@core/Services/_config/httpServiceResponseInterceptor"

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
  (value) => value,
  (error) => {
    return Promise.reject(error)
  }
)

export default new ServiceBuilder()
  .setEndpoint(process.env.NEXT_PUBLIC_API_ENDPOINT as string)
  .setRequestInterceptors(httpServiceRequestInterceptor)
  .setResponseInterceptors(httpServiceResponseInterceptor)
