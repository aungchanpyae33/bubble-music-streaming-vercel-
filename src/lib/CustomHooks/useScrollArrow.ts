// hooks/useScrollArrows.ts
import { useState, useCallback } from "react";

export function useScrollArrows() {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const updateArrows = useCallback((e: React.UIEvent<HTMLElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  const hideArrows = useCallback(() => {
    setShowLeft(false);
    setShowRight(false);
  }, []);

  return {
    showLeft,
    showRight,
    updateArrows,
    hideArrows,
  };
}
