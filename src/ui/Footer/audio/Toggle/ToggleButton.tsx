import DataContext from "@/lib/MediaSource/ContextMedia";
import {
  useDirectPlayBack,
  useRepeatAndCurrentPlayList,
  useSong,
  useSongFunction,
  useStorePlayListId,
  // useStorePlayListId,
} from "@/lib/zustand";
import { useContext, useEffect } from "react";
import type {
  SongFunctionState,
  SongFunctionActions,
  SongActions,
  IsRepeatState,
  DirectPlayBackAction,
  DirectPlayBackState,
  // StorePlayListIdState,
  SongState,
  StorePlayListIdState,
  StorePlayListIdStateAction,
} from "@/lib/zustand";
import { urlProp } from "@/ui/albumContainer/AudiosContainer";
import { Pause, Play } from "lucide-react";
import IconWrapper from "@/ui/general/IconWrapper";
import ToggleButtonSpaceKey from "./ToggleButtonSpaceKey";
import { getPlaylistSongsReturn } from "@/database/data";
import { DataContext } from "@/lib/MediaSource/ContextMedia";

interface Props extends React.ComponentProps<"button"> {
  urlProp: urlProp[];
}
function ToggleButton({ urlProp, className }: Props) {
  const { dataAudio, segNum, loadNextSegment } = useContext(DataContext);

  const Isplay = useSongFunction(
    (state: SongFunctionState) => Object.values(state.Isplay)[0]
  );
  const songCuUrl = useSong(
    (state: SongState) => Object.values(state.songCu)[0]
  );
  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) => Object.values(state.playlistId)[0] || []
  ) as string[];

  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );

  const setPlaylistId = useStorePlayListId(
    (state: StorePlayListIdStateAction) => state.setPlaylistId
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList
  );
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const isRepeat = useRepeatAndCurrentPlayList(
    (state: IsRepeatState) => state.isRepeat
  );
  useEffect(() => {
    const copyDataAudio = dataAudio!.current!;
    function handlePlay() {
      if (dataAudio.current?.readyState) {
        if (Isplay) {
          dataAudio.current.play();
        } else {
          dataAudio.current.pause();
        }
      }
    }

    function playNext() {
      const currentIndex = urlProp.findIndex((song) => song.url === songCuUrl);
      if (!isRepeat) {
        const songList = urlProp;
        if (currentIndex >= urlProp.length - 1) return;
        const { url, sege, duration, name } = songList[currentIndex + 1];
        const uniUrl = `${url},${playlistId[0]}`;
        updateSongCu({ [url || ""]: url, sege, duration, name });
        // [todo] need to check if there is a new playlist or not
        setPlaylistId({
          [playlistId[0] || ""]: [playlistId[0], url],
        });
        setPlay(uniUrl || "unknown", true);
        // [todo] need to check if there is a new playlist or not
        setPlayList(playlistId[0] || "unknown", true);
      } else {
        dataAudio!.current!.currentTime = 0;
        segNum.current = 1;
        dataAudio!.current!.play();
      }
    }

    handlePlay();
    copyDataAudio.addEventListener("ended", playNext);
    return () => {
      copyDataAudio.removeEventListener("ended", playNext);
    };
  }, [
    Isplay,
    dataAudio,
    setPlay,
    urlProp,
    updateSongCu,
    isRepeat,
    segNum,
    loadNextSegment,
    setPlayList,
    playlistId,
    songCuUrl,
    setPlaylistId,
  ]);

  return (
    <ToggleButtonSpaceKey
      setPlay={setPlay}
      setPlayList={setPlayList}
      songCuUrl={songCuUrl}
      playlistIdString={playlistId[0]}
    >
      <button
        className={className}
        id="play-icon"
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onClick={() => {
          // need to use with key value not undefined as firsetkey that get from isplay preversin is undefined and it will not trigger to the toggleElement
          setPlay(`${songCuUrl},${playlistId[0]}`, undefined);
          setPlayList(playlistId[0], undefined);
        }}
      >
        {Isplay ? (
          <IconWrapper size="large" Icon={Pause} />
        ) : (
          <IconWrapper size="large" Icon={Play} />
        )}
      </button>
    </ToggleButtonSpaceKey>
  );
}

export default ToggleButton;
