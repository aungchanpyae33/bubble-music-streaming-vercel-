export const runtime = "edge";

import { getData } from "@/database/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query: string | null = searchParams.get("with");
  if (query) {
    console.log(query);
    const data = await getData(query);

    return NextResponse.json(data, {
      headers: {
        "CDN-Cahche-Control": "public,max-age=0,smax-age=360000",
      },
    });
  }
}
