import {
  RefObject,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import IconWrapper from "../general/IconWrapper";
import { EllipsisVertical } from "lucide-react";
import debounce from "@/lib/debounce";

function QueueLoader({ queeRef }: { queeRef: RefObject<HTMLElement | null> }) {
  const [count, setCount] = useState(0);
  const getCount = useCallback(() => {
    console.log("initial");
    const container = queeRef.current;
    if (!container) return;
    if (!container) return;
    const clientHeight = container.clientHeight;
    const itemHeight = 60;
    setCount(Math.ceil(clientHeight / itemHeight) + 1);
  }, [queeRef]);
  const debounceGetCount = useMemo(() => debounce(getCount, 500), [getCount]);

  useLayoutEffect(() => {
    const container = queeRef.current;
    if (!container) return;
    if (!count) {
      getCount();
    }
    container.addEventListener("scroll", debounceGetCount, {
      passive: true,
    });
    return () => {
      container.removeEventListener("scroll", debounceGetCount);
    };
  }, [queeRef, getCount, count, debounceGetCount]);

  return (
    <div className="absolute inset-0  ">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="flex  h-[60px] gap-x-2   p-2 group animate-pulse items-stretch"
        >
          <div className="size-[50px] bg-[#333333] relative"></div>

          <div className="flex-1 flex-col overflow-hidden flex justify-center gap-1">
            <div className=" w-16 h-3 rounded-md bg-[#333333]"></div>
            <div className=" w-28 h-3 rounded-md bg-[#333333]"></div>
          </div>

          <div className="w-[30px] flex items-center">
            <IconWrapper Icon={EllipsisVertical} size="small" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default QueueLoader;
