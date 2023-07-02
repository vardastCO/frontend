import { GraphQLClient } from "graphql-request"
import { RequestMiddleware } from "graphql-request/build/esm/types"
import { getSession } from "next-auth/react"

const requestMiddleware: RequestMiddleware = async (request) => {
  const session = await getSession()
  const token = session?.user?.token || null

  return {
    ...request,
    headers: { ...request.headers, authorization: `Bearer ${token}` }
  }
}

const graphqlRequestClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
  { requestMiddleware }
)

export default graphqlRequestClient
