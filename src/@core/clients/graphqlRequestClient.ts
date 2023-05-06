import { GraphQLClient } from "graphql-request";

const graphqlRequestClient = new GraphQLClient(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string
)

export default graphqlRequestClient
