import MediaSessionSeek from "@/lib/MediaSession/MediaSessionSeek";
import DataContext from "@/lib/MediaSource/ContextMedia";
import { RefObject, useContext, useMemo, useRef } from "react";
import TimeIndicatorCur from "./TimeIndicatorCur";
import useAudioSeek from "@/lib/CustomHooks/AudioSeek";
import AudioThumbSlider from "./AudioThumbSlider";
import AudioProgressbar from "./AudioProgressbar";
import AudioSliderActionWrapper from "./AudioSliderActionWrapper";
import AudioSlider from "./AudioSlider";
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

function AudioSeekBar({ duration }: PropAudioSeek) {
  const {
    dataAudio,
    loadNextSegment,
    segNum,
    sege,
    abortController,
    fetching,
  } = useContext(DataContext);
  const isPointer = useMemo(() => "onpointerdown" in window, []);
  const isTouchDevice = useMemo(
    () => "ontouchstart" in window || navigator.maxTouchPoints > 0,
    []
  );
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue, setIsDragging] = useAudioSeek({
    dataAudio,
    sliderRef,
    duration,
    segNum,
    sege,
    abortController,
    fetching,
    loadNextSegment,
    isPointer,
    isTouchDevice,
  });

  MediaSessionSeek(
    fetching,
    abortController,
    segNum,
    dataAudio,
    sege,
    loadNextSegment,
    duration
  );
  // console.log("aus re-render");
  return (
    <>
      <TimeIndicatorCur value={value} duration={duration} />
      <AudioSlider
        sliderRef={sliderRef}
        setIsDragging={setIsDragging}
        duration={duration}
        value={value}
        setValue={setValue}
        progressRef={progressRef}
      >
        <AudioSliderActionWrapper
          sliderRef={sliderRef}
          isPointer={isPointer}
          isTouchDevice={isTouchDevice}
          setIsDragging={setIsDragging}
          setValue={setValue}
        >
          <div className=" w-full h-[3px]    bg-blue-700 relative">
            <AudioProgressbar value={value} progressRef={progressRef} />

            <AudioThumbSlider value={value} />
          </div>
        </AudioSliderActionWrapper>
      </AudioSlider>
    </>
  );
}

export default AudioSeekBar;
