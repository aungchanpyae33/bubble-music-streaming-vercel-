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
  StorePlayListIdState,
  StorePlayListIdStateAction,
  useDirectPlayBack,
  usePreviousPlayList,
  useRepeatAndCurrentPlayList,
  useSong,
  useSongFunction,
  useStorePlayListId,
} from "@/lib/zustand";
import { playlistProp, urlProp } from "../albumContainer/AudiosContainer";
import { RefObject, useRef } from "react";
import IconWrapper from "../general/IconWrapper";
import { Pause, Play } from "lucide-react";
const hasData = async (
  dataFromFetch: RefObject<Promise<playlistProp> | null>,
  index: number
) => {
  if (!dataFromFetch.current) {
    dataFromFetch.current = fetch(`/api/getPlaylistData/one${index}`).then(
      (res) => res.json()
    );
  }
  return dataFromFetch.current;
};
function DirectPlayButton({
  playListId,
  index,
}: {
  playListId: string;
  index: number;
}) {
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

  const handlePlayClick = async (index: number) => {
    const playlistData = !playlistId
      ? await hasData(dataFromFetch, index)
      : { playlistId: playListId, song: playListArray };
    console.log(playlistData);
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
      className=" absolute z-10 bottom-4 right-2  has-hover:transition-[transform,opacity,background-color] has-hover:duration-150 has-hover:group-hover:-translate-y-2 has-hover:opacity-0 has-hover:peer-focus:-translate-y-2  has-hover:peer-focus:opacity-100 
      has-hover:focus:-translate-y-2 
      has-hover:focus:opacity-100 
      has-hover:group-hover:opacity-100  p-2 bg-[#222222]"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handlePlayClick(index);
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
