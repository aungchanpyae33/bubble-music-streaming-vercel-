import React, { RefObject } from "react";
export const fetchSegment = (
  url: string,
  sourceBuffer: RefObject<SourceBuffer | null>,
  mediaSource: RefObject<MediaSource | null>,
  segNum: number | undefined = undefined,
  abortController: AbortController | null //need to get the data from other side ,so not use current
) => {
  const fetchOptions: RequestInit = {
    signal: abortController?.signal,
  };

  const outputUrl = segNum ? url.replace("init.mp4", `seg-${segNum}.m4s`) : url;

  fetch(`${outputUrl}`, fetchOptions)
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
