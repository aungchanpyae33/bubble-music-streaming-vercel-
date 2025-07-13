"use client";
import {
  useDirectPlayBack,
  useRepeatAndCurrentPlayList,
  useSong,
  useSongFunction,
  useStorePlayListId,
} from "@/lib/zustand";
import React from "react";
import type {
  SongState,
  SongActions,
  SongFunctionState,
  SongFunctionActions,
  currentSongPlaylistAction,
  DirectPlayBackAction,
  StorePlayListIdStateAction,
  // StorePlayListIdState,
  // StorePlayListIdStateAction,
} from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";
import { Pause, Play } from "lucide-react";
import { getSongsReturn, song } from "@/database/data";
import outputUniUrl from "@/lib/CustomHooks/OutputUniUrl";
interface toggleElementProp extends React.ComponentProps<"button"> {
  playlistSong: getSongsReturn | undefined;
  song: song;
}
const ToggleElement = ({
  playlistSong,
  className,
  song,
}: toggleElementProp) => {
  // console.log(playlistSong, "playlistsong");
  const { playlistId, uniUrl } = outputUniUrl(
    playlistSong,
    playlistSong!.might_repeat,
    song.uni_id,
    song.url
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

        // to handle same song but different playlist or album
        const { uniUrl: checkForToggle } = outputUniUrl(
          playlistSong,
          playlistSong!.might_repeat,
          song.uni_id,
          songCuUrl
        );
        if (uniUrl === checkForToggle) {
          setPlay(uniUrl || "", undefined);
          setPlayList(playlistId || "", undefined);
          setPlaylistId({
            [playlistId || ""]: [playlistId, song.url],
          });
        } else {
          const data = {
            [uniUrl || ""]: song.url,
            sege: song.sege,
            duration: song.duration,
            name: song.name,
            song_time_stamp: song.song_time_stamp,
            songId: song.id,
            uni_id: song.uni_id,
            is_liked: song.is_liked,
            artists: song.artists,
          };

          // console.log(data);
          updateSongCu(data);
          setPlaylistId({
            [playlistId || ""]: [playlistId, song.url],
          });
          setPlayList(playlistId || "", true);
          setPlay(uniUrl || "", true);
        }
      }}
      className={className}
      id="play-icon"
    >
      <span className=" flex justify-center">
        {song.url === songCuUrl && Isplay ? (
          <IconWrapper className="w-5 h-5 fill-white" Icon={Pause} />
        ) : (
          <IconWrapper className="w-5 h-5 fill-white" Icon={Play} />
        )}
      </span>
    </button>
  );
};

export default ToggleElement;
