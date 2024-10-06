import clsx from "clsx";
import { useState } from "react";

function AudioInfo({ name }: { name: string }) {
  const [animate, setanimatie] = useState(true);
  console.log("render");
  return (
    <div
      className="hidden md:block md:w-[150px]
    lg:w-[200px]
    overflow-hidden"
    >
      {/* w-fit is needed to be get full width when animate */}
      <div
        className={clsx("w-fit hover:ease-linear truncate hover:text-clip", {
          "animate-showtextoverflow": animate,
        })}
        // key={name}
        onAnimationEnd={() => {
          setanimatie(false);
        }}
        onMouseEnter={() => {
          //even same anitmate value would make still twice render even though prop is not change
          // first call is change from false to true ,seconde call is change from true to true , may be this is the reaseon
          !animate && setanimatie(true);
        }}
      >
        {name}
      </div>
    </div>
  );
}

export default AudioInfo;
