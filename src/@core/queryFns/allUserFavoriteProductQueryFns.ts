// import request from "graphql-request"

// import {
//   GetUserFavoriteProductDocument,
//   GetUserFavoriteProductQuery
// } from "@/generated"

// export const allUserFavoriteProductQueryFns = async (
//   accessToken = ""
// ): Promise<GetUserFavoriteProductQuery> => {
//   return await request(
//     process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
//     GetUserFavoriteProductDocument,
//     {
//       type: "product"
//     },
//     {
//       authorization: `Bearer ${accessToken}`
//     }
//   )
// }
