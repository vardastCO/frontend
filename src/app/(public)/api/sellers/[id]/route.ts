import { NextResponse } from "next/server"

import { getSellerQueryFn } from "@core/queryFns/sellerQueryFns"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  if (id) {
    try {
      const data = await getSellerQueryFn(+id)
      return NextResponse.json(data, { status: 200 })
    } catch {
      return NextResponse.json({ message: "not found" }, { status: 404 })
    }
  }

  return NextResponse.json({ message: "not found" }, { status: 404 })
}
