import {
  Dispatch,
  RefObject,
  SetStateAction,
  useLayoutEffect,
  useState,
} from "react";
interface tooltipRefProp {
  toolTipRef: RefObject<HTMLDivElement | null>;
}
interface tooltipState {
  show: boolean;
  toolTipLeft: { left: string };
}
const useTooltipOverflow = ({
  toolTipRef,
}: tooltipRefProp): [tooltipState, Dispatch<SetStateAction<tooltipState>>] => {
  const [tooltipShow, setTooltipShow] = useState<tooltipState>({
    show: false,
    toolTipLeft: { left: "50%" },
  });
  useLayoutEffect(() => {
    const copyRef = toolTipRef.current;
    if (tooltipShow.show && copyRef) {
      const tooltipRect = copyRef.getBoundingClientRect();
      const rightEdge = tooltipRect.right;
      const leftEdge = tooltipRect.left;
      if (rightEdge > window.document.body.offsetWidth) {
        const data = rightEdge - window.document.body.offsetWidth;
        setTooltipShow((pre) => ({
          ...pre,
          toolTipLeft: { left: `calc(50% - ${data}px)` },
        }));
      } else if (leftEdge < 0) {
        const data = Math.abs(leftEdge);
        setTooltipShow((pre) => ({
          ...pre,
          toolTipLeft: { left: `calc(50% + ${data}px)` },
        }));
      }
    }

    return () => {
      setTooltipShow((pre) => ({
        ...pre,
        toolTipLeft: { left: "50%" },
      }));
    };
  }, [tooltipShow.show, toolTipRef]);

  return [tooltipShow, setTooltipShow];
};
export default useTooltipOverflow;
