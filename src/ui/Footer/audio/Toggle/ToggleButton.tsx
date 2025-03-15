import DataContext from "@/lib/MediaSource/ContextMedia";
import {
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
} from "@/lib/zustand";
import { urlProp } from "@/ui/albumContainer/AudiosContainer";
interface Props extends React.ComponentProps<"button"> {
  urlProp: urlProp[];
}
function ToggleButton({ urlProp, className }: Props) {
  const { dataAudio } = useContext(DataContext);
  // Get the first key-value pair from Isplay
  const [firstKey, firstIsplay] = useSongFunction(
    (state: SongFunctionState) => Object.entries(state.Isplay)[0] || []
  );
  const urlSongs = urlProp.flatMap(({ url }) => url);
  const currentIndex = urlSongs.indexOf(firstKey);
  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const isRepeat = useRepeatAndCurrentPlayList(
    (state: IsRepeatState) => state.isRepeat
  );

  // console.log("render togglebutton");
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
        updateSongCu({ [url || ""]: url, sege, duration, name });
        // url is js keyName
        setPlay(url || "", true);
      } else {
        dataAudio!.current!.currentTime = 0;
        dataAudio!.current!.play();
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.code === "Space") {
        setPlay(firstKey, undefined);
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
    firstKey,
    urlProp,
    currentIndex,
    urlSongs.length,
    updateSongCu,
    isRepeat,
  ]);

  return (
    <button
      className={className}
      id="play-icon"
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      onClick={() => {
        setPlay(firstKey, undefined);
        // Use the first key to toggle the state
      }}
    >{`${firstIsplay ? "pause" : "play"}`}</button>
  );
}

export default ToggleButton;
