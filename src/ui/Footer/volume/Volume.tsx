import useVolumeSeek from "@/lib/CustomHooks/VolumeSeek";
import DataContext from "@/lib/MediaSource/ContextMedia";
import { useContext, useMemo, useRef } from "react";
import AudioThumbSlider from "../audio/SliderUi/AudioThumbSlider";
import AudioProgressbar from "../audio/SliderUi/AudioProgressbar";
import VolumeSlider from "./VolumeSlider";
import VolumeSliderActionWrapper from "./VolumeSliderActionWrapper";

function Volume() {
  const { dataAudio } = useContext(DataContext);
  const isPointer = useMemo(
    () => typeof window !== "undefined" && "onpointerdown" in window,
    []
  );
  const isTouchDevice = useMemo(
    () =>
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0),
    []
  );
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue, isDragging, setIsDragging] = useVolumeSeek({
    dataAudio,
    sliderRef,
    isPointer,
    isTouchDevice,
  });
  return (
    <div className="bg-white flex-1 ">
      <VolumeSlider
        setIsDragging={setIsDragging}
        sliderRef={sliderRef}
        setValue={setValue}
        value={value}
      >
        <VolumeSliderActionWrapper
          sliderRef={sliderRef}
          isPointer={isPointer}
          isTouchDevice={isTouchDevice}
          setIsDragging={setIsDragging}
          dataAudio={dataAudio}
          setValue={setValue}
        >
          <div className=" w-full h-[2px]   bg-blue-700 relative">
            <AudioProgressbar value={value} progressRef={progressRef} />

            <AudioThumbSlider value={value} isDragging={isDragging} />
          </div>
        </VolumeSliderActionWrapper>
      </VolumeSlider>
    </div>
  );
}

export default Volume;
