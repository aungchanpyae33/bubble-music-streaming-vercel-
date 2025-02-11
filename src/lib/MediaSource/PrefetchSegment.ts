import React, { RefObject } from "react";
export const PrefetchSegment = (
  url: string,
  sourceBuffer: RefObject<SourceBuffer | null>,
  mediaSource: RefObject<MediaSource | null>,
  segNum: number | undefined = undefined,
  abortController: AbortController | null,
  audioInitBufferRef: RefObject<ArrayBuffer | null>,
  audioSeg1BufferRef: RefObject<ArrayBuffer | null>
  //need to get the data from other side ,so not use current
) => {
  const fetchOptions: RequestInit = {
    signal: abortController?.signal,
  };

  const initUrl = url;
  const seg1Url = url.replace("init.mp4", "seg-1.m4s");
  Promise.all([
    fetch(initUrl, fetchOptions).then((res) => res.arrayBuffer()),
    fetch(seg1Url, fetchOptions).then((res) => res.arrayBuffer()),
  ])
    .then(([initBuffer, seg1Buffer]) => {
      if (
        sourceBuffer.current?.buffered &&
        !sourceBuffer.current.updating &&
        mediaSource.current?.readyState
      ) {
        audioInitBufferRef.current = initBuffer;
        audioSeg1BufferRef.current = seg1Buffer;
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
