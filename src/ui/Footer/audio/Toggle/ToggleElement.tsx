"use client";
import {
  useDirectPlayBack,
  usePreviousPlayList,
  useRepeatAndCurrentPlayList,
  useSong,
  useSongFunction,
  useStorePlayListId,
  // useStorePlayListId,
} from "@/lib/zustand";
import React from "react";
import type {
  SongState,
  SongActions,
  SongFunctionState,
  SongFunctionActions,
  currentSongPlaylistAction,
  previousSongPlaylistAction,
  DirectPlayBackAction,
  StorePlayListIdStateAction,
  // StorePlayListIdState,
  // StorePlayListIdStateAction,
} from "@/lib/zustand";
import { playlistProp } from "@/ui/albumContainer/AudiosContainer";
import IconWrapper from "@/ui/general/IconWrapper";
import { Pause, Play } from "lucide-react";
interface toggleElementProp {
  url: string;
  sege: number;
  duration: number;
  name: string;
  playlistUrl: playlistProp;
}
const ToggleElement = ({
  url,
  sege,
  duration,
  name,
  playlistUrl,
}: toggleElementProp) => {
  const uniUrl = `${url},${playlistUrl.playlistId}`;
  // for toggle audio
  const Isplay = useSongFunction(
    (state: SongFunctionState) => state.Isplay[uniUrl || ""]
  );
  //  for current song with presist
  const songCuUrl = useSong(
    (state: SongState) => (state.songCu as Record<string, string>)[url || ""]
  );
  // for current playlist(id and song currentSongUrl as to know for directplayback button)
  const setPlaylistId = useStorePlayListId(
    (state: StorePlayListIdStateAction) => state.setPlaylistId
  );

  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const setPlayListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylistAction) => state.setPlayListArray
  );
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const setPreviousPlayListArray = usePreviousPlayList(
    (state: previousSongPlaylistAction) => state.setPreviousPlayListArray
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList
  );
  // console.log(Isplay, url === songCuUrl, songCuUrl, url);
  // console.log("render toggleElement");
  return (
    <td className="px-2 max-w-[10px] ">
      <button
        role="rowCell1"
        // tabIndex={-1}
        aria-label="Play or Pause Audio"
        onKeyDown={(e) => {
          if (e.key === " " || e.code === "Space") {
            e.stopPropagation();
          }
        }}
        // onMouseDown={(e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        // }}
        onClick={() => {
          setPlayListArray({
            [playlistUrl.playlistId || ""]: playlistUrl.song,
          });
          setPreviousPlayListArray({
            [playlistUrl.playlistId || ""]: playlistUrl.song,
          });
          if (url === songCuUrl) {
            setPlay(uniUrl || "", undefined);
            setPlayList(playlistUrl.playlistId || "", undefined);
          } else {
            updateSongCu({ [url || ""]: url, sege, duration, name });
            setPlaylistId({
              [playlistUrl.playlistId || ""]: [playlistUrl.playlistId, url],
            });
            setPlayList(playlistUrl.playlistId || "", true);
            setPlay(uniUrl || "", true);
          }
        }}
        className="w-full"
        id="play-icon"
      >
        <span className=" flex justify-center">
          {url === songCuUrl && Isplay ? (
            <IconWrapper className="w-5 h-5 fill-white" Icon={Pause} />
          ) : (
            <IconWrapper className="w-5 h-5 fill-white" Icon={Play} />
          )}
        </span>
      </button>
    </td>
  );
};

export default ToggleElement;
