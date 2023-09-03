import { NextResponse } from "next/server"

import { getProductBasicsQueryFn } from "@core/queryFns/productBasicsQueryFns"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  if (id) {
    try {
      const data = await getProductBasicsQueryFn(+id)
      return NextResponse.json(data, { status: 200 })
    } catch {
      return NextResponse.json({ message: "not found" }, { status: 404 })
    }
  }

  return NextResponse.json({ message: "not found" }, { status: 404 })
}
