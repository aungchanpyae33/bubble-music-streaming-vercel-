"use client";
import {
  currentSongPlaylist,
  currentSongPlaylistAction,
  DirectPlayBackAction,
  DirectPlayBackState,
  previousSongPlaylistAction,
  SongActions,
  SongDetail,
  SongFunctionActions,
  SongFunctionState,
  StorePlayListIdState,
  StorePlayListIdStateAction,
  // StorePlayListIdState,
  // StorePlayListIdStateAction,
  useDirectPlayBack,
  usePreviousPlayList,
  useRepeatAndCurrentPlayList,
  useSong,
  useSongFunction,
  useStorePlayListId,
  // useStorePlayListId,
} from "@/lib/zustand";
import { playlistProp } from "../albumContainer/AudiosContainer";
import { RefObject, useRef } from "react";
import IconWrapper from "../general/IconWrapper";
import { Pause, Play } from "lucide-react";
const hasData = async (
  dataFromFetch: RefObject<Promise<playlistProp> | null>
) => {
  if (!dataFromFetch.current) {
    dataFromFetch.current = fetch("/api/getPlaylistData").then((res) =>
      res.json()
    );
  }
  return dataFromFetch.current;
};
function DirectPlayButton({ playListId }: { playListId: string }) {
  const dataFromFetch = useRef<Promise<playlistProp> | null>(null);

  // toggle playlistfolder
  const IsPlayList = useDirectPlayBack(
    (state: DirectPlayBackState) => state.IsPlayList[playListId || ""]
  );
  // current playlist id and current song
  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) =>
      (state.playlistId as Record<string, Array<string>>)[playListId || ""]
  );
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) =>
      (state.playListArray as Record<string, SongDetail[]>)[playListId || ""]
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

  const setPreviousPlayListArray = usePreviousPlayList(
    (state: previousSongPlaylistAction) => state.setPreviousPlayListArray
  );

  const handlePlayClick = async () => {
    const playlistData = !playlistId
      ? await hasData(dataFromFetch)
      : { playlistId: playListId, song: playListArray };

    if (playlistData) {
      const currentIndex = (() => {
        if (playlistId) {
          return playlistData.song.findIndex(
            (song: SongDetail) => song.url === playlistId[1]
          );
        }
        return 0;
      })();
      const { url, sege, name, duration } = (() => {
        if (playlistId) {
          return playlistData.song[currentIndex];
        }
        return playlistData.song[0];
      })();
      const uniUrl = `${url},${playListId}`;

      setPreviousPlayListArray({
        [playListId || ""]: playlistData.song,
      });
      setPlayListArray({
        [playListId || ""]: playlistData.song,
      });
      if (playlistId) {
        setPlay(uniUrl || "", undefined);
        setPlayList(playListId || "", undefined);
      } else {
        updateSongCu({ [url || ""]: url, sege, duration, name });
        setPlaylistId({
          [playListId || ""]: [playListId, url],
        });
        setPlayList(playListId || "", true);
        setPlay(uniUrl || "", true);
      }
    }
  };

  return (
    <button
      className=" absolute z-10 bottom-4 right-2 transition-[transform,opacity,background-color] duration-150 group-hover:-translate-y-2 opacity-0 peer-focus:-translate-y-2 peer-focus:opacity-100 focus:-translate-y-2 focus:opacity-100 group-hover:opacity-100  p-2 bg-[#222222]"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handlePlayClick();
      }}
    >
      {IsPlayList ? (
        <IconWrapper className="w-5 h-5 fill-white" Icon={Pause} />
      ) : (
        <IconWrapper className="w-5 h-5 fill-white" Icon={Play} />
      )}
    </button>
  );
}

export default DirectPlayButton;
