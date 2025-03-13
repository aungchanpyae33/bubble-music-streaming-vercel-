import React, { RefObject } from "react";
export const fetchSegment = (
  url: string,
  sourceBuffer: RefObject<SourceBuffer | null>,
  mediaSource: RefObject<MediaSource | null>,
  segNum: number | undefined = undefined,
  abortController: RefObject<AbortController | null>
) => {
  const fetchOptions: RequestInit = {
    signal: abortController!.current!.signal,
  };

  // https://bubbleapideno.netlify.app
  // fetch(`https://bubblemusicapi.vercel.app/api?with=${outputUrl}`, fetchOptions)

  // `https://jolly-sun-bbad.bubblemusic990.workers.dev/api?with=${outputUrl}`,
  const outputUrl =
    segNum !== undefined ? url.replace("init.mp4", `seg-${segNum}.m4s`) : url;
  //  `${segNum ? videoSegments[segNum] : videoSegments[0]}`
  fetch(outputUrl, fetchOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`failed to fetch the song segements sege-${segNum}`);
      }
      return response.arrayBuffer();
    })
    .then((buf) => {
      if (
        sourceBuffer.current?.buffered &&
        !sourceBuffer.current.updating &&
        mediaSource.current?.readyState
      ) {
        // console.log(segNum, "it got buffend");
        sourceBuffer.current!.appendBuffer(buf);
      }
    })

    .catch((err) => {
      if (err.name === "AbortError") {
        console.log(`the song segements sege-${segNum} fetching is aborted`);
      } else {
        console.error(`Error fetching segements sege-${segNum}`, err);
      }
    });
};
