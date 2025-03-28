export const runtime = "edge";

import { urlProp } from "@/ui/albumContainer/AudiosContainer";
import { NextResponse } from "next/server";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

  // Mock data
  // it should be playlistLId : {[]}
  const playListMock = {
    playlistId: "one",
    song: [
      {
        url: "https://s3.tebi.io/tebi.bubblemusic.us.kg/init.mp4",
        sege: 24,
        name: "neverofeorghoihergioehrer",
        duration: 239.467,
      },
      //pain in the ass that i am using wrong s3 tebi url not cdn url and it takes 2 days
      {
        url: "https://njjvikpbvsfomrpyxnta.supabase.co/storage/v1/object/public/sdk/music/init.mp4",
        sege: 24,
        name: "gonenewtest",
        duration: 239.467,
      },

      {
        url: "https://kokopop.vercel.app/assets/nn/init.mp4",
        sege: 24,
        name: "paper lady",
        duration: 239.467,
      },
      {
        url: "https://kokopop.vercel.app/assets/init.mp4",
        sege: 24,
        name: "paper lady",
        duration: 239.467,
      },
      {
        url: "https://s3.tebi.io/test1345/testsmall/init.mp4",
        sege: 88,
        name: "pannsmall",
        duration: 263.19,
      },

      {
        url: "https://s3.tebi.io/test1345/sond/init.mp4",
        sege: 5,
        name: "panngg",
        duration: 247.744,
      },
      {
        url: " https://s3.tebi.io/test1345/nicee/init.mp4",
        sege: 12,
        name: "pannlast",
        duration: 155.222,
      },
    ],
  };
  return NextResponse.json(playListMock, {
    headers: {
      "CDN-Cahche-Control": "public,max-age=0,smax-age=360000",
    },
  });
}
