import { cache } from "react"
import { QueryClient } from "@tanstack/react-query"

import { queryClientOptions } from "@core/lib/constants"

const getQueryClient = cache(() => new QueryClient(queryClientOptions))
export default getQueryClient
