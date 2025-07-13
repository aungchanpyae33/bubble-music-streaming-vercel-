import React from "react";
import EdgeFade from "../playlist/EdgeFade";
import { getProps } from "@/database/data";
import ContextContainer from "./ContextContainer";
import ArrowNaviContainer from "./ArrowNaviContainer";
import SonglistsContainer from "../playlist/SonglistsContainer";
import SonglistWrapper from "./SonglistWrapper";
function Container({
  songs,
  description,
}: {
  songs: getProps[];
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
        <SonglistWrapper>
          {songs &&
            songs.map((item, index) => {
              return (
                <SonglistsContainer
                  index={index}
                  key={item.id}
                  name={item.name}
                  id={item.id}
                  source={item.source}
                  type={item.type}
                  description={description}
                  related_id={item.related_id}
                  related_name={item.related_name}
                />
              );
            })}
        </SonglistWrapper>
      </div>
    </ContextContainer>
  );
}

export default Container;
