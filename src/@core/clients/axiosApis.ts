import axios from "axios"
import { Session } from "next-auth"

export type IServePdf = {
  uuid: string
  access_token: Session["accessToken"]
}

const servePdf = ({ uuid, access_token }: IServePdf) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/base/storage/file/${uuid}`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
      responseType: "arraybuffer"
    }
  )
}

const axiosApis = {
  servePdf
}

export default axiosApis
