import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import debounce from "../debounce";

export const useVirtuosoLoader = ({
  containerRef,
  length,
}: {
  containerRef: RefObject<HTMLElement | null>;
  length: number;
}) => {
  const [count, setCount] = useState(0);
  const getCount = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!container) return;

    const clientHeight = container.clientHeight;
    const itemHeight = 60;
    const maxItem = Math.ceil(clientHeight / itemHeight) + 1;
    const autualItem = length;
    const countData = Math.min(autualItem, maxItem);
    setCount(countData);
  }, [containerRef, length]);
  const debounceGetCount = useMemo(() => debounce(getCount, 500), [getCount]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", debounceGetCount, {
      passive: true,
    });
    return () => {
      container.removeEventListener("scroll", debounceGetCount);
    };
  }, [containerRef, debounceGetCount]);
  useLayoutEffect(() => {
    getCount();
  }, [getCount, length]);
  return [count];
};
