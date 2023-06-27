import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { GetVocabularyDocument, Vocabulary } from "@/generated";
import request from "graphql-request";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export const getVocabularyQueryFn = async (): Promise<{ vocabulary: Vocabulary }> => {
    const session = typeof window === 'undefined' ? await getServerSession(authOptions) : await getSession()

    return await request(
        process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
        GetVocabularyDocument,
        {
            slug: "product_categories"
        },
        {
            authorization: `Bearer ${session?.user?.token}`
        }
    )
}
