import useVolumeSeek from "@/lib/CustomHooks/VolumeSeek";
import DataContext from "@/lib/MediaSource/ContextMedia";
import { useContext, useMemo, useRef } from "react";
import AudioThumbSlider from "../audio/SliderUi/AudioThumbSlider";
import AudioProgressbar from "../audio/SliderUi/AudioProgressbar";
import VolumeSlider from "./VolumeSlider";
import VolumeSliderActionWrapper from "./VolumeSliderActionWrapper";
import clsx from "clsx";
import VolumeMuteButton from "./VolumeMuteButton";

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
    <div
      className={clsx(
        "hover:absolute max-w-[200px] group  md:hover:static md:w-full w-fit flex bg-black   hover:left-0 hover:right-0 hover:flex hover:w-full",
        {
          "absolute w-full  left-0 right-0 flex md:static": isDragging,
        }
      )}
    >
      <div
        className={clsx(
          "bg-white p-1 flex  md:flex-1 w-fit group hover:flex-1",
          {
            "flex-1": isDragging,
          }
        )}
      >
        <VolumeMuteButton
          isDragging={isDragging}
          value={value}
          dataAudio={dataAudio}
          setValue={setValue}
        />
        <button
          className={clsx("md:hidden group-hover:hidden", {
            hidden: isDragging,
          })}
        >
          vol
        </button>
        <VolumeSlider
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          sliderRef={sliderRef}
          setValue={setValue}
          dataAudio={dataAudio}
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
    </div>
  );
}

export default Volume;
