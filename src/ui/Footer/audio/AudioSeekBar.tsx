import DataContext from "@/lib/MediaSource/ContextMedia";
import { playBackRate } from "@/lib/MediaSource/playBackRate";
import { TimeFormat } from "@/lib/TimeFormat";
import { useContext } from "react";
import { eventProp } from "@/lib/MediaSource/playBackRate";
interface PropAudioSeek {
  dataCur: React.MutableRefObject<HTMLSpanElement | null>;
  bottom: boolean;
  setBottom: React.Dispatch<React.SetStateAction<boolean>>;
  duration: number;
  dataInput: React.MutableRefObject<HTMLInputElement | null>;
}
function AudioSeekBar({
  dataCur,
  bottom,
  setBottom,
  duration,
  dataInput,
}: PropAudioSeek) {
  // console.log("render AudioSeekbar");
  const {
    dataAudio,
    loadNextSegment,
    segNum,
    sege,
    abortController,
    fetching,
  } = useContext(DataContext);

  function seekFunction(e: eventProp["e"]) {
    if (!bottom) {
      if (fetching.current) {
        if (abortController.current) {
          abortController.current.abort();
        }
        abortController.current = new AbortController();
        fetching.current = false;
      }

      segNum.current = playBackRate({ dataAudio, e, sege });

      loadNextSegment();
    }
    setBottom(true);
  }
  return (
    <input
      type="range"
      id="seek-slider"
      ref={dataInput}
      max={duration}
      className=" flex-1"
      onKeyUp={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          seekFunction(e);
        } else if (e.key !== "Tab") {
          e.preventDefault();
        }
      }}
      onMouseUp={(e) => {
        seekFunction(e);
      }}
      onTouchEnd={(e) => {
        seekFunction(e);
      }}
      // prevent timeupdate
      onTouchStart={() => setBottom(false)}
      onMouseDown={() => setBottom(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          setBottom(false);
        } else if (e.key !== "Tab") {
          e.preventDefault();
        }
      }}
      // show changeDuration while seeking without effecting the audio
      onInput={(e) => {
        dataCur.current!.textContent = TimeFormat(+e.currentTarget.value);
      }}
    />
  );
}

export default AudioSeekBar;
