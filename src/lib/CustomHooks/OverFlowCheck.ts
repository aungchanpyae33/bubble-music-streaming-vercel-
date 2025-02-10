import React, { RefObject, useEffect, useState } from "react";
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
  useEffect(() => {
    const checkOverflow = () => {
      const fullWidth = element.current!.scrollWidth;
      const showWidth = element.current!.clientWidth;
      if (fullWidth > showWidth) {
        const overFlowWidth = (fullWidth - showWidth) * showWidth;
        setIsOverFlow({
          duration: overFlowWidth,
          clientWidth: showWidth,
        });
        setanimatie(true);
      }
    };
    checkOverflow();
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const clientWidth = Math.round(entry.contentRect.width);
        const scrollWidth = entry.target.scrollWidth;
        if (scrollWidth <= clientWidth) {
          setIsOverFlow({
            duration: 0,
            clientWidth: 0,
          });
          setanimatie(false);
        }
      }
    });
    observer.observe(element!.current!);

    return () => {
      observer.disconnect();
    };
  }, [element]);
  return [isOverFlow, animate, setanimatie, setIsOverFlow];
};
export default useOverflowCheck;
