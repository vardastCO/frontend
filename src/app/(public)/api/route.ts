import { NextResponse } from "next/server"

export async function GET(req: Request) {
  return NextResponse.json(JSON.stringify({ id: 10 }))
}
