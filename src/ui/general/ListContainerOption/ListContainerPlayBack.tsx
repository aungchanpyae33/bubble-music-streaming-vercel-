"use client";
import { getArtistPageProps } from "@/database/data";
import {
  currentSongPlaylistAction,
  DirectPlayBackAction,
  DirectPlayBackState,
  SongActions,
  SongDetail,
  SongFunctionActions,
  SongState,
  StorePlayListIdState,
  StorePlayListIdStateAction,
  useDirectPlayBack,
  useRepeatAndCurrentPlayList,
  useSong,
  useSongFunction,
  useStorePlayListId,
} from "@/lib/zustand";
import React from "react";
import IconWrapper from "../IconWrapper";
import { Pause, Play } from "lucide-react";

interface ListContainerPlayBackProps {
  list: getArtistPageProps["songs"];
}
function ListContainerPlayBack({ list }: ListContainerPlayBackProps) {
  const playListId = list!.id;
  const IsPlayList = useDirectPlayBack(
    (state: DirectPlayBackState) => state.IsPlayList[playListId || ""]
  );
  const { id: id_scope } = useSong(
    (state: SongState) => state.songCu
  ) as SongDetail;
  // current playlist id and current song
  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) =>
      (state.playlistId as Record<string, Array<string>>)[playListId || ""]
  );
  const setPlaylistId = useStorePlayListId(
    (state: StorePlayListIdStateAction) => state.setPlaylistId
  );
  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList
  );
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);

  const setPlayListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylistAction) => state.setPlayListArray
  );

  const handlePlayClick = async () => {
    if (list) {
      const {
        url,
        sege,
        duration,
        name,
        song_time_stamp,
        id,
        song_id,
        is_liked,
        artists,
      } = (() => {
        if (playlistId) {
          return list.songs[id_scope];
        }
        return list.songs[list.idArray[0]];
      })();
      const uniUrl = id;
      setPlayListArray({
        [playListId || ""]: list,
      });
      if (playlistId) {
        setPlay("unknown", undefined);
        setPlayList("unknown", undefined);
      } else {
        updateSongCu({
          [uniUrl || ""]: url,
          sege,
          duration,
          name,
          song_time_stamp,
          id,
          song_id,
          is_liked,
          artists,
        });
        setPlaylistId({
          [playListId || ""]: [playListId, id],
        });
        setPlayList(playListId || "", true);
        setPlay(uniUrl || "", true);
      }
    }
  };
  return (
    <button
      className="p-2 bg-[#3664ba]  rounded-full"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handlePlayClick();
      }}
    >
      {IsPlayList ? (
        <IconWrapper className="fill-white" size="medium" Icon={Pause} />
      ) : (
        <IconWrapper className="fill-white" size="medium" Icon={Play} />
      )}
    </button>
  );
}

export default ListContainerPlayBack;
