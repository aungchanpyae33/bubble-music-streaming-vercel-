"use client";
import {
  currentSongPlaylist,
  currentSongPlaylistAction,
  DirectPlayBackAction,
  DirectPlayBackState,
  SongActions,
  SongFunctionActions,
  StorePlayListIdState,
  StorePlayListIdStateAction,
  useDirectPlayBack,
  useRepeatAndCurrentPlayList,
  useSong,
  useSongFunction,
  useStorePlayListId,
} from "@/lib/zustand";
import React, { RefObject, useRef } from "react";
import IconWrapper from "../general/IconWrapper";
import { Pause, Play } from "lucide-react";
import { getPlaylistPageProps, listSongsSection } from "@/database/data";
import { PostgrestError } from "@supabase/supabase-js";
import { getPlaylistSongsClient } from "@/database/client-data";
const hasData = async (
  dataFromFetch: RefObject<Promise<{
    data: getPlaylistPageProps | null;
    error: PostgrestError | any | null;
  }> | null>,
  playlistId: string
) => {
  if (!dataFromFetch.current) {
    dataFromFetch.current = getPlaylistSongsClient(playlistId);
  }
  return dataFromFetch.current;
};

interface DirectPlayButtonProps extends React.ComponentProps<"div"> {
  playlistIdDeft: string;
}
function DirectPlayButton({
  playlistIdDeft,
  className,
}: DirectPlayButtonProps) {
  const dataFromFetch = useRef<Promise<{
    data: getPlaylistPageProps | null;
    error: PostgrestError | any | null;
  }> | null>(null);

  // toggle playlistfolder
  const IsPlayList = useDirectPlayBack(
    (state: DirectPlayBackState) => state.IsPlayList[playlistIdDeft || ""]
  );
  // current playlist id and current song
  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) =>
      (state.playlistId as Record<string, Array<string>>)[playlistIdDeft || ""]
  );
  const playlist_songId = playlistId ? playlistId[1] : undefined;
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) =>
      (state.playListArray as Record<string, listSongsSection | undefined>)[
        playlistIdDeft
      ]
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
  async function getData() {
    const returnData = await hasData(dataFromFetch, playlistIdDeft);
    const { data, error } = returnData;
    console.log(data, error);
    if (error || !data) return;
    const { songs } = data;
    if (!songs) return;
    return songs;
  }
  const handlePlayClick = async () => {
    const playlistData = !playlistId ? await getData() : playListArray;
    console.log(playlistData);
    if (playlistData) {
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
        if (playlistId && playlist_songId) {
          return playlistData.songs[playlist_songId];
        }
        return playlistData.songs[playlistData.idArray[0]];
      })();
      const uniUrl = id;
      setPlayListArray({
        [playlistIdDeft || ""]: playlistData,
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
          [playlistIdDeft || ""]: [playlistIdDeft, id],
        });
        setPlayList(playlistIdDeft || "", true);
        setPlay(uniUrl || "", true);
      }
    }
  };

  return (
    <button
      className={className}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
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

export default DirectPlayButton;
