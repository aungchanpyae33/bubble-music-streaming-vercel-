import React from "react";
import PlaylistContainer from "../playlist/PlaylistContainer";
import ArrowNavi from "@/lib/Accessibility/ArrowNavi";
function Container({
  songs,
  description,
}: {
  songs: string[];
  description: string;
}) {
  // const dataInc = useRef(0);
  return (
    <div
      className="border-2 overflow-auto  max-w-full
       "
      role="row"
      // tabIndex={0}
      // onKeyDown={(e) => {
      //   ArrowNavi(e, dataInc, "ArrowRight", "ArrowLeft", 6, "cell");
      // }}
    >
      <h1 aria-label="song  name is" className="pl-4 sticky left-0">
        {description}
      </h1>

      <div className=" w-fit gap-2 md:gap-3 lg:gap-4 flex p-4">
        {[...Array(6)].map((_, index) => (
          <PlaylistContainer
            key={index}
            index={index}
            songs={songs}
            description={index + description}
          />
        ))}
      </div>
    </div>
  );
}

export default Container;
