import useOverflowCheck from "@/lib/CustomHooks/OverFlowCheck";
import clsx from "clsx";
import { RefObject } from "react";
function AudioInfoOverFlow({
  ofcheckDiv,
  name,
}: {
  ofcheckDiv: RefObject<HTMLDivElement | null>;
  name: string;
}) {
  const [isOverFlow, animate, setanimatie, setIsOverFlow] =
    useOverflowCheck(ofcheckDiv);

  return (
    /* w-fit is needed to be get full width when animate */
    <div
      className={clsx("w-fit hover:ease-linear truncate hover:text-clip ", {
        "animate-showtextoverflow": animate && isOverFlow.duration > 0,
      })}
      style={
        isOverFlow.duration > 0
          ? ({
              animationDuration: `${isOverFlow.duration}ms`,
              "--animate-translate-info": `${isOverFlow.clientWidth}px`,
            } as React.CSSProperties)
          : {}
      }
      onAnimationEnd={() => {
        isOverFlow.duration > 0 && setanimatie(false);
      }}
      onMouseEnter={() => {
        //even same anitmate value would make still twice render even though prop is not change
        // first call is change from false to true ,seconde call is change from true to true , may be this is the reaseon to prevent it use check ===

        // found the answer check below link
        // https://github.com/facebook/react/issues/20817
        const fullWidth = ofcheckDiv.current!.scrollWidth;
        const showWidth = ofcheckDiv.current!.clientWidth;
        if (fullWidth > showWidth) {
          const overFlowWidth = (fullWidth - showWidth) * showWidth;

          if (isOverFlow.duration !== overFlowWidth) {
            setIsOverFlow({
              duration: overFlowWidth,
              clientWidth: showWidth,
            });
          }
          if (!animate) {
            console.log(animate);
            setanimatie(true);
          }
        }
      }}
    >
      {name}
    </div>
  );
}

export default AudioInfoOverFlow;
