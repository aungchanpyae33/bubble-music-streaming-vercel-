import useOverflowCheck from "@/lib/CustomHooks/OverFlowCheck";
import clsx from "clsx";
function AudioInfoOverFlow({
  ofcheckDiv,
  name,
}: {
  ofcheckDiv: React.MutableRefObject<HTMLDivElement | null>;
  name: string;
}) {
  const [isOverFlow, animate, setanimatie] = useOverflowCheck(ofcheckDiv) as [
    boolean,
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ];
  return (
    /* w-fit is needed to be get full width when animate */
    <div
      className={clsx("w-fit hover:ease-linear truncate hover:text-clip", {
        "animate-showtextoverflow": animate && isOverFlow,
      })}
      // key={name}
      onAnimationEnd={() => {
        isOverFlow && setanimatie(false);
      }}
      onMouseEnter={() => {
        //even same anitmate value would make still twice render even though prop is not change
        // first call is change from false to true ,seconde call is change from true to true , may be this is the reaseon
        !animate && isOverFlow && setanimatie(true);
      }}
    >
      {name}
    </div>
  );
}

export default AudioInfoOverFlow;
