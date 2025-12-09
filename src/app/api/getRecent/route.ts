import { getRecent } from "@/database/data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await getRecent();
    return new NextResponse(JSON.stringify({ data, error }), {
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
