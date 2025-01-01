import React, { RefObject, useEffect, useState } from "react";

const useOverflowCheck = (
  element: RefObject<HTMLDivElement | null>
): [
  number,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<number>>
] => {
  const [isOverFlow, setIsOverFlow] = useState(0);
  const [animate, setanimatie] = useState(true);
  useEffect(() => {
    const checkOverflow = () => {
      const fullWidth = element.current!.scrollWidth;
      const showWidth = element.current!.clientWidth;
      if (fullWidth > showWidth) {
        const overFlowWidth = (fullWidth - showWidth) * 150;
        setIsOverFlow(overFlowWidth);
        setanimatie(true);
      }
    };
    checkOverflow();
  }, [element]);
  return [isOverFlow, animate, setanimatie, setIsOverFlow];
};
export default useOverflowCheck;
