import React from "react";
import EdgeFade from "../playlist/EdgeFade";
import { getDataProps } from "@/database/data";
import ContextContainer from "./ContextContainer";
import ArrowNaviContainer from "./ArrowNaviContainer";
import SonglistsContainer from "../playlist/SonglistsContainer";
import SonglistWrapper from "./SonglistWrapper";
function Container({
  songs,
  description,
}: {
  songs: getDataProps["getAllTest"];
  description: string;
}) {
  return (
    <ContextContainer>
      <div aria-label="song name is" className=" justify-between px-4  flex ">
        <button>{description}</button>
        <ArrowNaviContainer />
      </div>
      <div className="relative z-0 max-w-fit">
        <SonglistWrapper>
          {songs &&
            songs.idArray.map((id, index) => {
              const item = songs[`${id}`];
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
