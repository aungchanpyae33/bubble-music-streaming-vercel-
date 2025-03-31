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
  const testId = ["one", "two", "three", "four", "five", "six"];
  // const dataInc = useRef(0);
  return (
    <div
      className=" max-w-full  pb-3"
      role="row"
      // tabIndex={0}
      // onKeyDown={(e) => {
      //   ArrowNavi(e, dataInc, "ArrowRight", "ArrowLeft", 6, "cell");
      // }}
    >
      <h1 aria-label="song name is" className=" px-4 ">
        {description}
      </h1>

      <div className=" w-full p-4  gap-4 md:gap-6 lg:gap-8 flex overflow-x-auto   no-scrollbar">
        {[...Array(6)].map((_, index) => (
          <PlaylistContainer
            key={index}
            index={index}
            songs={songs}
            testId={testId[index]}
            description={index + description}
          />
        ))}
      </div>
    </div>
  );
}

export default Container;
