"use client";
import React from "react";
import { getDataProps, getRecentReturn, listInfo } from "@/database/data";
import ContextContainer from "./ContextContainer";
import ArrowNaviContainer from "./ArrowNaviContainer";
import SonglistsContainer from "../playlist/SonglistsContainer";
import SonglistWrapper from "./SonglistWrapper";
import { useQuery } from "@tanstack/react-query";
import { getRecentClient } from "@/database/client-data";
function RecentlyListContainer({
  songs,
  description,
}: {
  songs: getRecentReturn[keyof getRecentReturn];
  description: string;
}) {
  const { data, error } = useQuery({
    queryKey: ["recentlyPlayed"],
    queryFn: () => getRecentClient(),
    initialData: songs,
  });

  if (!data || error) return;
  return (
    <ContextContainer>
      <div aria-label="song name is" className=" justify-between px-4  flex ">
        <h3>{description}</h3>
        <ArrowNaviContainer />
      </div>
      <div className="relative z-0 max-w-fit">
        <SonglistWrapper>
          {data &&
            data.idArray.map((id, index) => {
              const item = data[`${id}`] as listInfo;
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
                  cover_url={item.cover_url}
                />
              );
            })}
        </SonglistWrapper>
      </div>
    </ContextContainer>
  );
}

export default RecentlyListContainer;
