import MediaSessionSeek from "@/lib/MediaSession/MediaSessionSeek";
import DataContext from "@/lib/MediaSource/ContextMedia";
import { playBackRate } from "@/lib/MediaSource/playBackRate";
import { TimeFormat } from "@/lib/TimeFormat";
import { RefObject, useContext } from "react";
export interface eventProp {
  e:
    | React.MouseEvent<HTMLInputElement>
    | React.TouchEvent<HTMLInputElement>
    | React.KeyboardEvent<HTMLInputElement>;
}
interface PropAudioSeek {
  dataCur: RefObject<HTMLSpanElement | null>;
  bottom: boolean;
  setBottom: React.Dispatch<React.SetStateAction<boolean>>;
  duration: number;
  dataInput: RefObject<HTMLInputElement | null>;
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

      const data = parseFloat(e.currentTarget.value);

      segNum.current = playBackRate({ dataAudio, data, sege, duration });
      // console.log(segNum.current);
      loadNextSegment();
    }
    setBottom(true);
  }
  MediaSessionSeek(
    fetching,
    abortController,
    segNum,
    dataAudio,
    sege,
    loadNextSegment,
    duration
  ); // Pass value for seeking
  // console.log(duration);
  return (
    <div className="ml-10 border-2 group border-black h-[30px] w-[600px] flex items-center">
      <div className="flex-1 h-[8px]  flex bg-blue-700 relative select-none">
        <div className="bg-red-400  absolute top-0 left-0 h-full"></div>

        <span className="absolute   w-[20px] rounded-full h-[20px] top-1/2 -translate-y-1/2 bg-black -translate-x-[10px]"></span>
      </div>
    </div>
  );
}

//   <input
//     type="range"
//     id="seek-slider"
//     ref={dataInput}
//     // step={bottom ? "0.001" : undefined}
//     max={duration}
//     className=" flex-1"
//     onKeyUp={(e) => {
//       if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
//         seekFunction(e);
//       } else if (e.key !== "Tab") {
//         e.preventDefault();
//       }
//     }}
//     onMouseUp={(e) => {
//       seekFunction(e);
//     }}
//     onTouchEnd={(e) => {
//       seekFunction(e);
//     }}
//     // prevent timeupdate
//     onTouchStart={() => setBottom(false)}
//     onMouseDown={() => setBottom(false)}
//     onKeyDown={(e) => {
//       if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
//         setBottom(false);
//       } else if (e.key !== "Tab") {
//         e.preventDefault();
//       }
//     }}
//     // show changeDuration while seeking without effecting the audio
//     onInput={(e) => {
//       dataCur.current!.textContent = TimeFormat(+e.currentTarget.value);
//     }}
//   />
// );

export default AudioSeekBar;
