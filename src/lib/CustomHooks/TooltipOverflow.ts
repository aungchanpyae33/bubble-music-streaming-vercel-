import {
  Dispatch,
  RefObject,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
interface tooltipRefProp {
  toolTipRef: RefObject<HTMLDivElement | null>;
  tooltipTargetRef: RefObject<HTMLDivElement | null>;
}
export interface tooltipState {
  show: boolean;
  toolTipPosition: {};
}
interface previousValueProp {
  x: number;
  y: number;
}
const useTooltipOverflow = ({
  toolTipRef,
  tooltipTargetRef,
}: tooltipRefProp): [tooltipState, Dispatch<SetStateAction<tooltipState>>] => {
  const [tooltipShow, setTooltipShow] = useState<tooltipState>({
    show: false,
    toolTipPosition: {},
  });
  const previousValue = useRef<previousValueProp>({
    x: 0,
    y: 0,
  });
  useLayoutEffect(() => {
    const tooltipTargetEle = tooltipTargetRef.current;
    const tooltipEle = toolTipRef.current;
    if (tooltipShow.show && tooltipTargetEle && tooltipEle) {
      const tooltipRect = tooltipTargetEle.getBoundingClientRect();
      const innerWidth = window.innerWidth;
      const tooltipRectTop = tooltipRect.top;
      // conditional check run
      if (
        previousValue.current!.x !== innerWidth ||
        previousValue.current!.y !== tooltipRectTop
      ) {
        const goRect = tooltipEle.getBoundingClientRect();
        previousValue.current!.x = innerWidth;
        previousValue.current!.y = tooltipRectTop;
        const data =
          tooltipRect.left + tooltipRect.width / 2 - goRect.width / 2;
        const positionX = Math.max(
          8,
          Math.min(data, innerWidth - goRect.width - 8)
        );
        const positionTop = tooltipRectTop - goRect.height;
        const positionBottom = tooltipRect.bottom;
        const positionY =
          positionTop < 50 ? positionBottom + 8 : positionTop - 8;
        setTooltipShow((pre) => ({
          ...pre,
          toolTipPosition: { left: `${positionX}px`, top: `${positionY}px` },
        }));
      }
    }
  }, [tooltipShow.show, toolTipRef, tooltipTargetRef]);

  return [tooltipShow, setTooltipShow];
};
export default useTooltipOverflow;
