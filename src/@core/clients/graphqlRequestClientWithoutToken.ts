import { GraphQLClient } from "graphql-request"
import { RequestMiddleware } from "graphql-request/build/esm/types"

const requestMiddleware: RequestMiddleware = async (request) => {
  try {
    return request
  } catch (error) {
    throw new Error(`${error}`)
  }
}

const graphqlRequestClientWithoutToken = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
  { requestMiddleware }
)

export default graphqlRequestClientWithoutToken
