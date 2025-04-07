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
      const urlSongs = urlProp.flatMap(({ url }) => `${url},${playlistId[0]}`);
      const currentIndex = urlSongs.indexOf(`${songCuUrl},${playlistId[0]}`);
      if (!isRepeat) {
        const songList = urlProp;
        if (currentIndex >= urlSongs.length - 1) return;
        const { url, sege, duration, name } = songList[currentIndex + 1];
        const uniUrl = `${url},${playlistId[0]}`;
        updateSongCu({ [url || ""]: url, sege, duration, name });
        setPlaylistId({
          [playlistId[0] || ""]: [playlistId[0], url],
        });
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
        setPlay(`${songCuUrl},${playlistId[0]}`, undefined);
        setPlayList(playlistId[0], undefined);
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
  );
}

export default ToggleButton;
