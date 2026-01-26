import { getSimilarSongQueue } from "@/database/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const songId = searchParams.get("songId");
  try {
    if (!songId) throw "songId is required";
    const { data, error } = await getSimilarSongQueue(songId);

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
      },
    );
  }
}
