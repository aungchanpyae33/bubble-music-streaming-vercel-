export const runtime = "edge";
import { getPlaylistSongs } from "@/database/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json(
      { error: "Playlist id is required" },
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const { data, error } = await getPlaylistSongs(slug);
  const returnData = data && data[0];
  if (error || !data || !returnData) {
    return NextResponse.json(
      { error: "Internal server error", details: error },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return NextResponse.json(returnData, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
