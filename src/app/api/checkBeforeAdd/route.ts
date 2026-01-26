import { checkSongsBeforeAdd } from "@/database/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const playlistId = searchParams.get("playlistId");
  const songId = searchParams.get("songId");
  try {
    if (!songId || !playlistId) throw "songId  or playlistId is required";
    const { exists, error } = await checkSongsBeforeAdd(playlistId, songId);
    return new NextResponse(JSON.stringify({ exists, error }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        exists: false,
        error: `Internal server error ,${error}`,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
