import { RefObject, useEffect } from "react";

function useSetFocusMounted({
  refFocus,
}: {
  refFocus: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    if (!refFocus.current) return;
    refFocus.current.focus();
  }, [refFocus]);
}
export default useSetFocusMounted;
