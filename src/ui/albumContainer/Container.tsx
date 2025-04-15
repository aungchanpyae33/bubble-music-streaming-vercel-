import React from "react";
import PlaylistContainer from "../playlist/PlaylistContainer";
import ArrowNavi from "@/lib/Accessibility/ArrowNavi";
import IconWrapper from "../general/IconWrapper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EdgeFade from "../playlist/EdgeFade";
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
      className=" max-w-full pb-3"
      role="row"
      // tabIndex={0}
      // onKeyDown={(e) => {
      //   ArrowNavi(e, dataInc, "ArrowRight", "ArrowLeft", 6, "cell");
      // }}
    >
      <h1 aria-label="song name is" className=" px-4 ">
        {description}
      </h1>
      <div className="relative max-w-fit">
        <EdgeFade className=" bg-gradient-to-r from-[#0808087f] to-transparent left-0" />
        <EdgeFade className="bg-gradient-to-l from-[#0808087f] to-transparent right-0  " />
        <div className=" max-w-fit p-4    gap-2 md:gap-4 lg:gap-6 flex  no-scrollbar snap-x scroll-smooth   overflow-y-visible overflow-x-auto">
          {[...Array(10)].map((_, index) => (
            <PlaylistContainer
              key={index}
              index={index}
              songs={songs}
              testId={testId[index]}
              description={index + description}
            />
          ))}
        </div>
        <span className=" absolute top-0  right-0 -translate-y-6 pr-4 flex">
          <button>
            <IconWrapper
              size="medium"
              className="text-white/70 hover:text-white"
              Icon={ChevronLeft}
            />
          </button>
          <button>
            <IconWrapper
              size="medium"
              className="text-white/70 hover:text-white"
              Icon={ChevronRight}
            />
          </button>
        </span>
      </div>
    </div>
  );
}

export default Container;
