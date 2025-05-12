import { RefObject, useEffect } from "react";

function SetFocusMounted({
  refFocus,
}: {
  refFocus: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    if (!refFocus.current) return;
    refFocus.current.focus();
  }, [refFocus]);
}
export default SetFocusMounted;
