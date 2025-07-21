export const runtime = "edge";
import { getPlaylistSongs } from "@/database/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json(
        { error: "id is required" },
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const { data, error } = await getPlaylistSongs(slug);
    if (error || !data) {
      return NextResponse.json(
        { error: "Internal server error", details: error },
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return NextResponse.json(
      { data, error: null },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
