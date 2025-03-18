import { RefObject } from "react";

export const fetchSegment = async (
  url: string,
  sourceBuffer: RefObject<SourceBuffer | null>,
  mediaSource: RefObject<MediaSource | null>,
  segNum: number | undefined = undefined,
  abortController: RefObject<AbortController | null>
) => {
  const fetchOptions: RequestInit = {
    signal: abortController!.current!.signal,
  };

  const outputUrl =
    segNum !== undefined ? url.replace("init.mp4", `seg-${segNum}.m4s`) : url;

  try {
    const response = await fetch(outputUrl, fetchOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch the song segment seg-${segNum}`);
    }
    const buf = await response.arrayBuffer();
    if (
      sourceBuffer.current?.buffered &&
      !sourceBuffer.current.updating &&
      mediaSource.current?.readyState
    ) {
      sourceBuffer.current!.appendBuffer(buf);
    }

    return buf;
  } catch (err) {
    const error = err as Error;
    if (error.name === "AbortError") {
      console.log(`The song segment seg-${segNum} fetching was aborted`);
    } else {
      console.error(`Error fetching segment seg-${segNum}:`, err);
    }
  }
};
