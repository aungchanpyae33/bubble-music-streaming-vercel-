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
import IconWrapper from "@/ui/general/IconWrapper";
import { Pause, Play } from "lucide-react";
import { getSongsReturn } from "@/database/data";
import outputUniUrl from "@/lib/CustomHooks/OutputUniUrl";
interface toggleElementProp extends React.ComponentProps<"button"> {
  url: string;
  sege: number;
  duration: number;
  name: string;
  song_time_stamp: Array<number>;
  playlistSong: getSongsReturn | undefined;
  songId: number;
  might_repeat: boolean | undefined;
  uni_id: number | undefined;
}
const ToggleElement = ({
  url,
  sege,
  duration,
  name,
  playlistSong,
  song_time_stamp,
  className,
  songId,
  might_repeat,
  uni_id,
}: toggleElementProp) => {
  // console.log(playlistSong, "playlistsong");
  const { playlistId, uniUrl } = outputUniUrl(
    playlistSong,
    might_repeat,
    uni_id,
    url
  );
  // console.log(uniUrl);
  // for toggle audio
  const Isplay = useSongFunction(
    (state: SongFunctionState) => state.Isplay[uniUrl || ""]
  );
  //  for current song with presist
  const songCuUrl = useSong(
    (state: SongState) => (state.songCu as Record<string, string>)[uniUrl || ""]
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

  return (
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
          [playlistId || ""]: playlistSong,
        });
        setPreviousPlayListArray({
          [playlistId || ""]: playlistSong,
        });
        // to handle same song but different playlist or album
        const { uniUrl: checkForToggle } = outputUniUrl(
          playlistSong,
          might_repeat,
          uni_id,
          songCuUrl
        );
        if (uniUrl === checkForToggle) {
          setPlay(uniUrl || "", undefined);
          setPlayList(playlistId || "", undefined);
          setPlaylistId({
            [playlistId || ""]: [playlistId, url],
          });
        } else {
          const data = {
            [uniUrl || ""]: url,
            sege,
            duration,
            name,
            song_time_stamp,
            songId,
            uni_id,
          };

          // console.log(data);
          updateSongCu(data);
          setPlaylistId({
            [playlistId || ""]: [playlistId, url],
          });
          setPlayList(playlistId || "", true);
          setPlay(uniUrl || "", true);
        }
      }}
      className={className}
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
  );
};

export default ToggleElement;
