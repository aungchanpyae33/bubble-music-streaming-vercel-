import React, { useEffect, useState } from "react";

const useOverflowCheck = (
  element: React.MutableRefObject<HTMLDivElement | null>
) => {
  const [isOverFlow, setIsOverFlow] = useState(false);
  const [animate, setanimatie] = useState(true);
  useEffect(() => {
    const checkOverflow = () => {
      if (element.current!.scrollWidth > element.current!.clientWidth) {
        // console.log("i am hit");
        setIsOverFlow(true);
        setanimatie(true);
      } else {
        setIsOverFlow(false);
      }
    };
    checkOverflow();
  }, [element]);
  return [isOverFlow, animate, setanimatie];
};
export default useOverflowCheck;
