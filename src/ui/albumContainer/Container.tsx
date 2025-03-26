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
      className="overflow-auto mt-8  max-w-full"
      role="row"
      // tabIndex={0}
      // onKeyDown={(e) => {
      //   ArrowNavi(e, dataInc, "ArrowRight", "ArrowLeft", 6, "cell");
      // }}
    >
      <h1 aria-label="song  name is" className=" mb-2">
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
