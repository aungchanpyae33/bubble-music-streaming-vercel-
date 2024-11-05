export const runtime = "edge";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query: string | null = searchParams.get("with");
  if (query) {
    console.log(query);
    const fetchData = await fetch(query, {
      priority: "high",
      keepalive: true,
    });
    // Create a new NextResponse based on the original fetchData response
    const response = new NextResponse(fetchData.body, {
      status: fetchData.status,
      headers: fetchData.headers,
    });
    response.headers.set(
      "CDN-Cache-Control",
      "public,max-age=0,smax-age=360000"
    );
    return response;
  }
  return NextResponse.json(
    { error: "Query parameter 'with' is missing" },
    { status: 400 }
  );
}
