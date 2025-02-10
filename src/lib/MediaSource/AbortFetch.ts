import { RefObject } from "react";

const AbortFetch = (
  fetching: RefObject<boolean>,
  abortController: RefObject<AbortController | null>
) => {
  if (fetching.current) {
    if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();
    fetching.current = false;
  }
};
export default AbortFetch;
