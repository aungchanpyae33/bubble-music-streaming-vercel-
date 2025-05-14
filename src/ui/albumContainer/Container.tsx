import React from "react";
import PlaylistContainer from "../playlist/PlaylistContainer";
import EdgeFade from "../playlist/EdgeFade";
import { getProps } from "@/database/data";
import ContextContainer from "./ContextContainer";
import PlaylistWrapper from "./PlaylistWrapper";
import ArrowNaviContainer from "./ArrowNaviContainer";
function Container({
  songs,
  description,
}: {
  songs: getProps;
  description: string;
}) {
  return (
    <ContextContainer>
      <div aria-label="song name is" className=" justify-between px-4  flex ">
        <button>{description}</button>
        <ArrowNaviContainer />
      </div>
      <div className="relative z-0 max-w-fit">
        <EdgeFade className=" bg-gradient-to-r from-[#0808087f] to-transparent left-0" />
        <EdgeFade className="bg-gradient-to-l from-[#0808087f] to-transparent right-0  " />
        <PlaylistWrapper>
          {songs.data &&
            songs.data.map((item, index) => {
              return (
                <PlaylistContainer
                  index={index}
                  key={item.id}
                  songs={item.name}
                  testId={item.id}
                  description={description}
                />
              );
            })}
        </PlaylistWrapper>
      </div>
    </ContextContainer>
  );
}

export default Container;
