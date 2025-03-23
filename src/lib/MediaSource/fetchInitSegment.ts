import { RefObject } from "react";
import { FetchingState } from "../CustomHooks/MediaSourceBuffer";

export const fetchInitSegment = async (
  url: string,
  sourceBuffer: RefObject<SourceBuffer | null>,
  mediaSource: RefObject<MediaSource | null>,
  fetching: RefObject<FetchingState>
) => {
  const outputUrl = url;

  try {
    const response = await fetch(outputUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch the song init`);
    }
    const buf = await response.arrayBuffer();
    if (
      sourceBuffer.current?.buffered &&
      !sourceBuffer.current.updating &&
      mediaSource.current?.readyState
    ) {
      sourceBuffer.current!.appendBuffer(buf);
      fetching.current.isFetch = false;
    }

    return buf;
  } catch (err) {
    const error = err as Error;
    if (error.name === "AbortError") {
      console.log(`The song init fetching was aborted`);
    } else {
      console.error(`Error fetching init:`, err);
    }
  }
};
