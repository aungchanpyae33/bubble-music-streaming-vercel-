export const runtime = "edge";
import { getData } from "@/database/client-data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query: string | null = searchParams.get("with");
  if (query) {
    const { data, error } = await getData(query);
    if (error) {
      return new NextResponse(
        JSON.stringify({ error: "Internal server error", details: error }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!data || data.length === 0) {
      return new NextResponse(JSON.stringify({ data: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(JSON.stringify({ data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
