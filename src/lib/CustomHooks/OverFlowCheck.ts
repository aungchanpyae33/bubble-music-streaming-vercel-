import React, { RefObject, useEffect, useRef, useState } from "react";
import debounce from "../debounce";
interface isOverFlowProp {
  duration: number;
  clientWidth: number;
}
const useOverflowCheck = (
  element: RefObject<HTMLDivElement | null>
): [
  isOverFlowProp,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<isOverFlowProp>>
] => {
  const [isOverFlow, setIsOverFlow] = useState({
    duration: 0,
    clientWidth: 0,
  });
  const [animate, setanimatie] = useState(true);
  const previousWidth = useRef(0);
  useEffect(() => {
    const checkOverflow = () => {
      const fullWidth = element.current!.scrollWidth;
      const showWidth = element.current!.clientWidth;
      if (fullWidth > showWidth) {
        const overFlowWidth = (fullWidth - showWidth) * showWidth;
        previousWidth.current = showWidth;
        setIsOverFlow({
          duration: overFlowWidth,
          clientWidth: showWidth,
        });
        setanimatie(true);
      }
    };
    checkOverflow();
    const debounceResize = debounce((entries) => {
      for (let entry of entries) {
        const clientWidth = Math.round(entry.contentRect.width);
        if (clientWidth !== previousWidth.current) {
          // need to check as it is returing object
          if (isOverFlow.duration !== 0 && isOverFlow.clientWidth !== 0) {
            setIsOverFlow({
              duration: 0,
              clientWidth: 0,
            });
          }
          setanimatie(false);
        }
      }
    }, 300);
    const observer = new ResizeObserver(debounceResize);
    observer.observe(element!.current!);

    return () => {
      observer.disconnect();
    };
  }, [element, isOverFlow.clientWidth, isOverFlow.duration]);
  return [isOverFlow, animate, setanimatie, setIsOverFlow];
};
export default useOverflowCheck;
