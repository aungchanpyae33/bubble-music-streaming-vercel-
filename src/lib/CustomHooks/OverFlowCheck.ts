import React, {
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import debounce from "../debounce";
import { Context } from "../MediaSource/ContextMediaAudioFull";
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
  React.Dispatch<React.SetStateAction<isOverFlowProp>>,
  RefObject<number>
] => {
  const [isOverFlow, setIsOverFlow] = useState({
    duration: 0,
    clientWidth: 0,
  });
  const { open } = useContext(Context);
  const animateItterate = useRef(1);
  const [animate, setanimatie] = useState(true);
  const previousWidth = useRef(0);
  useEffect(() => {
    const checkOverflow = () => {
      if (open) return;
      const fullWidth = element.current!.scrollWidth;
      const showWidth = element.current!.clientWidth;
      if (fullWidth > showWidth) {
        const overFlowWidth = ((fullWidth - showWidth) * showWidth) / 2;
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
      if (open) return;
      for (let entry of entries) {
        const clientWidth = Math.round(entry.contentRect.width);
        if (clientWidth !== previousWidth.current) {
          //reset two animation track ref
          animateItterate.current = 1;
          setanimatie(false);
        }
      }
    }, 150);
    const observer = new ResizeObserver(debounceResize);
    observer.observe(element!.current!);

    return () => {
      observer.disconnect();
    };
  }, [element, isOverFlow.clientWidth, isOverFlow.duration, open]);
  return [isOverFlow, animate, setanimatie, setIsOverFlow, animateItterate];
};
export default useOverflowCheck;
