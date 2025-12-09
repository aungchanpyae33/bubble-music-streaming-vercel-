import { getData } from "@/database/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query: string | null = searchParams.get("with");
  if (query) {
    try {
      const { data, error } = await getData(query);
      if (error || !data) {
        return new NextResponse(
          JSON.stringify({
            data: null,
            error: "Internal server error",
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      if (data.length === 0) {
        return new NextResponse(JSON.stringify({ data: [], error: null }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new NextResponse(JSON.stringify({ data, error: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new NextResponse(
        JSON.stringify({
          data: null,
          error: `Internal server error ,${error}`,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
}
