import DataContext from "@/lib/MediaSource/ContextMedia";
import {
  useDirectPlayBack,
  useRepeatAndCurrentPlayList,
  useSong,
  useSongFunction,
} from "@/lib/zustand";
import { useContext, useEffect } from "react";
import type {
  SongFunctionState,
  SongFunctionActions,
  SongActions,
  IsRepeatState,
  DirectPlayBackAction,
  DirectPlayBackState,
} from "@/lib/zustand";
import { urlProp } from "@/ui/albumContainer/AudiosContainer";
import { Pause, Play } from "lucide-react";
import IconWrapper from "@/ui/general/IconWrapper";

interface Props extends React.ComponentProps<"button"> {
  urlProp: urlProp[];
}
function ToggleButton({ urlProp, className }: Props) {
  const { dataAudio, segNum, loadNextSegment } = useContext(DataContext);
  // Get the first key-value pair from Isplay
  const [firstIsplayKey, firstIsplay] = useSongFunction(
    (state: SongFunctionState) => Object.entries(state.Isplay)[0] || []
  );
  const [firstIsplayListKey, _] = useDirectPlayBack(
    (state: DirectPlayBackState) => Object.entries(state.IsPlayList)[0] || []
  );
  const urlSongs = urlProp.flatMap(({ url }) => `${url},${firstIsplayListKey}`);

  const currentIndex = urlSongs.indexOf(firstIsplayKey);
  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
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
        if (firstIsplay) {
          dataAudio.current.play();
        } else {
          dataAudio.current.pause();
        }
      }
    }
    function playNext() {
      if (!isRepeat) {
        const songList = urlProp;
        if (currentIndex >= urlSongs.length - 1) return;

        const { url, sege, duration, name } = songList[currentIndex + 1];
        const uniUrl = `${url},${firstIsplayListKey}`;
        updateSongCu({ [url || ""]: url, sege, duration, name });
        setPlay(uniUrl || "", true);
        // [todo] need to check if there is a new playlist or not
        setPlayList("unknown", undefined);
      } else {
        dataAudio!.current!.currentTime = 0;
        segNum.current = 1;
        dataAudio!.current!.play();
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.code === "Space") {
        setPlay(firstIsplayKey, undefined);
        setPlayList("unknown", undefined);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    handlePlay();
    copyDataAudio.addEventListener("ended", playNext);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      copyDataAudio.removeEventListener("ended", playNext);
    };
  }, [
    firstIsplay,
    dataAudio,
    setPlay,
    firstIsplayKey,
    urlProp,
    currentIndex,
    urlSongs.length,
    updateSongCu,
    isRepeat,
    segNum,
    loadNextSegment,
    setPlayList,
    firstIsplayListKey,
  ]);

  return (
    <button
      className={className}
      id="play-icon"
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      onClick={() => {
        setPlay(firstIsplayKey, undefined);
        setPlayList("unknown", undefined);
        // Use the first key to toggle the state
      }}
    >
      {firstIsplay ? (
        <IconWrapper size="large" Icon={Pause} />
      ) : (
        <IconWrapper size="large" Icon={Play} />
      )}
    </button>
  );
}

export default ToggleButton;
