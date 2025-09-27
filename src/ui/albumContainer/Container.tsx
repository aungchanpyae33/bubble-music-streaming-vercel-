import React from "react";
import EdgeFade from "../playlist/EdgeFade";
import { getDataProps, listInfo } from "@/database/data";
import ContextContainer from "./ContextContainer";
import ArrowNaviContainer from "./ArrowNaviContainer";
import SonglistsContainer from "../playlist/SonglistsContainer";
import SonglistWrapper from "./SonglistWrapper";
function Container({
  songs,
  description,
}: {
  songs: getDataProps[keyof getDataProps];
  description: string;
}) {
  return (
    <ContextContainer>
      <div aria-label="song name is" className=" justify-between px-4  flex ">
        <h3>{description}</h3>
        <ArrowNaviContainer />
      </div>
      <div className="relative z-0 max-w-fit">
        <SonglistWrapper>
          {songs &&
            songs.idArray.map((id, index) => {
              const item = songs[`${id}`] as listInfo;
              return (
                <SonglistsContainer
                  index={index}
                  key={item.id}
                  name={item.name}
                  id={item.id}
                  type={item.type}
                  description={description}
                  related_id={item.related_id}
                  related_name={item.related_name}
                  cover_url={item.cover_url}
                />
              );
            })}
        </SonglistWrapper>
      </div>
    </ContextContainer>
  );
}

export default Container;
