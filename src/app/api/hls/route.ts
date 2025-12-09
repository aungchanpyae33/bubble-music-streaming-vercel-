import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const initUrl = searchParams.get("url"); // absolute init.mp4 URL
    if (!initUrl) {
      return new NextResponse("Missing init.mp4 URL", { status: 400 });
    }

    // Example: 24 segments
    const segments = Array.from({ length: 24 }, (_, i) => {
      const segNum = i + 1;
      // Replace the filename with segment name
      const segmentUrl = initUrl.replace("init.mp4", `seg-${segNum}.m4s`);
      return `#EXTINF:10.0,\n${segmentUrl}`;
    }).join("\n");

    const m3u8 = `#EXTM3U
#EXT-X-VERSION:6
#EXT-X-PLAYLIST-TYPE:VOD
#EXT-X-INDEPENDENT-SEGMENTS
#EXT-X-TARGETDURATION:11
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-MAP:URI="${initUrl}"
${segments}
#EXT-X-ENDLIST`;

    return new NextResponse(m3u8, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.mpegurl",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    return new NextResponse(
      `#EXTM3U\n#EXT-X-ERROR: Internal server error ,${error}`,
      {
        status: 500,
        headers: { "Content-Type": "application/vnd.apple.mpegurl" },
      }
    );
  }
}
