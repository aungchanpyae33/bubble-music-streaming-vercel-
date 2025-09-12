"use client";
import {
  useDirectPlayBack,
  useInstantFallBackAudioFull,
  useRepeatAndCurrentPlayList,
  useShouldFetchSongsList,
  useSong,
  useSongFunction,
  useStorePlayListId,
} from "@/lib/zustand";
import React, { useContext } from "react";
import type {
  SongState,
  SongActions,
  SongFunctionState,
  SongFunctionActions,
  currentSongPlaylistAction,
  DirectPlayBackAction,
  StorePlayListIdStateAction,
  ShouldFetchSongsListIdAction,
  isFallBackAudioActions,
} from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";
import { Pause, Play } from "lucide-react";
import { listSongsSection, SongInfo } from "@/database/data";
import { AudioElementContext } from "../AudioWrapper";
import { canPlayHLS } from "@/lib/CustomHooks/MediaSourceBuffer";
import { HlsDirectPlay } from "@/lib/HlsDirectPlay";
interface toggleElementProp extends React.ComponentProps<"button"> {
  playlistSong: listSongsSection | undefined;
  song: SongInfo;
}
const ToggleElement = ({
  playlistSong,
  className,
  song,
}: toggleElementProp) => {
  const uniUrl = song.id;
  const playlistId = playlistSong ? playlistSong.id : `create-on-fly-${uniUrl}`;
  // for toggle audio
  const Isplay = useSongFunction(
    (state: SongFunctionState) => state.Isplay[uniUrl || ""]
  );
  //  for current song with presist
  const songCuUrl = useSong(
    (state: SongState) => (state.songCu as Record<string, string>)[uniUrl || ""]
  );

  const FetchSongsListIdAction = useShouldFetchSongsList(
    (state: ShouldFetchSongsListIdAction) => state.FetchSongsListIdAction
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
  const setIsFallBackAudio = useInstantFallBackAudioFull(
    (state: isFallBackAudioActions) => state.setIsFallBackAudio
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList
  );
  const { audioEl } = useContext(AudioElementContext);
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
        setIsFallBackAudio(); //fallback dynamic import
        if (playlistSong) {
          setPlayListArray({
            [playlistId || ""]: playlistSong,
          });
          FetchSongsListIdAction(undefined);
        } else {
          const data = {
            id: playlistId,
            name: "autogenerate",
            is_official: false,
            related_id: "autogenerate",
            realted_name: "autogenerate",
            source: "none",
            type: "playlist",
            songs: {
              [uniUrl]: song,
            },
            idArray: [uniUrl],
          };
          setPlayListArray({
            [playlistId || ""]: data,
          });

          FetchSongsListIdAction(playlistId);
        }

        // to handle same song but different playlist or album

        // safe to check currentsong exist because it will only one source of truth
        if (songCuUrl) {
          setPlay("unknown", undefined);
          setPlayList("unknown", undefined);
        } else {
          const data = {
            [uniUrl || ""]: song.url,
            sege: song.sege,
            duration: song.duration,
            name: song.name,
            song_time_stamp: song.song_time_stamp,
            id: song.id,
            is_lyric: song.is_lyric,
            song_id: song.song_id,
            is_liked: song.is_liked,
            artists: song.artists,
            cover_url: song.cover_url,
          };
          updateSongCu(data);
          setPlaylistId({
            [playlistId || ""]: [playlistId, song.id],
          });
          setPlayList(playlistId || "", true);
          setPlay(uniUrl || "", true);
          HlsDirectPlay(song.url, audioEl);
        }
      }}
      className={className}
      id="play-icon"
    >
      <span className=" flex justify-center">
        {song.url === songCuUrl && Isplay ? (
          <IconWrapper className="fill-white" Icon={Pause} size="medium" />
        ) : (
          <IconWrapper className="fill-white" Icon={Play} size="medium" />
        )}
      </span>
    </button>
  );
};

export default ToggleElement;
