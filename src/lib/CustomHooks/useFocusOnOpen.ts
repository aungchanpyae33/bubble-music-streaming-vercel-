import { RefObject, useEffect } from "react";

// The Reusable Function
const useFocusOnOpen = (
  isOpen: boolean,
  ref: RefObject<HTMLElement | null>,
) => {
  useEffect(() => {
    // Check if it is open AND if the element exists
    if (isOpen && ref.current) {
      ref.current.focus();
    }
  }, [isOpen, ref]);
};

export default useFocusOnOpen;
