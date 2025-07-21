export const runtime = "edge";
import { getUserPlaylist } from "@/database/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  try {
    const { data, error } = await getUserPlaylist();
    console.log(data, "i am data bitch");
    if (error || !data) {
      return NextResponse.json(
        { error },
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
