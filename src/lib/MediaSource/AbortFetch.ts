import { RefObject } from "react";

const AbortFetch = (
  fetching: RefObject<{ isFetch: boolean; fetchingseg: number }>,
  abortController: RefObject<AbortController | null>,
  seekSeg: number
) => {
  if (fetching.current.isFetch) {
    if (abortController.current && fetching.current.fetchingseg !== seekSeg) {
      // console.log(seekSeg, fetching.current.fetchingseg);
      abortController.current.abort();
      abortController.current = new AbortController();
      fetching.current.isFetch = false;
    }
  }
};
export default AbortFetch;
