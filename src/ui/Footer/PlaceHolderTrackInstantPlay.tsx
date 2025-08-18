"use client";

import { getSongsReturn, song } from "@/database/data";
import {
  currentSongPlaylistAction,
  DirectPlayBackAction,
  ShouldFetchSongsListIdAction,
  SongActions,
  SongFunctionActions,
  StorePlayListIdStateAction,
  useDirectPlayBack,
  useRepeatAndCurrentPlayList,
  useShouldFetchSongsList,
  useSong,
  useSongFunction,
  useStorePlayListId,
} from "@/lib/zustand";
import { useEffect } from "react";

function PlaceHolderTrackInstantPlay({
  playlistSong,
  song,
}: {
  playlistSong: getSongsReturn | undefined;
  song: song;
}) {
  const playlistId = playlistSong?.id;
  const uniUrl = song.id;

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

  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList
  );

  useEffect(() => {
    if (playlistSong) {
      setPlayListArray({
        [playlistId || ""]: playlistSong,
      });
    } else {
      const data = {
        id: playlistId,
        name: "autogenerate",
        related_id: "smooth",
        realted_name: "autogenerate",
        source: "none",
        songs: [song],
      };
      setPlayListArray({
        [playlistId || ""]: data,
      });

      FetchSongsListIdAction(playlistId);
    }

    // to handle same song but different playlist or album

    const data = {
      [uniUrl || ""]: song.url,
      sege: song.sege,
      duration: song.duration,
      name: song.name,
      song_time_stamp: song.song_time_stamp,
      id: song.id,
      song_id: song.song_id,
      is_liked: song.is_liked,
      artists: song.artists,
    };
    updateSongCu(data);
    setPlaylistId({
      [playlistId || ""]: [playlistId, song.id],
    });
    setPlayList(playlistId || "", true);
    setPlay(uniUrl || "", true);
  }, [
    FetchSongsListIdAction,
    playlistId,
    playlistSong,
    setPlay,
    setPlayList,
    setPlayListArray,
    setPlaylistId,
    song,
    uniUrl,
    updateSongCu,
  ]);
  return null;
}

export default PlaceHolderTrackInstantPlay;
