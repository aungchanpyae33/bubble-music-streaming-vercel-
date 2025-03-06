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

  const { value, setValue, isDragging, setIsDragging } = useVolumeSeek({
    dataAudio,
    sliderRef,
    isPointer,
    isTouchDevice,
  });
  return (
    <div className=" flex lg:w-full items-center  group p-1  bg-black">
      <div
        className={clsx(
          "absolute h-full group-hover:flex lg:static lg:w-full lg:flex  bg-black      right-0  w-full",
          {
            flex: isDragging,
            hidden: !isDragging,
          }
        )}
      >
        <div className="flex  w-fit  flex-1">
          <VolumeMuteButton
            isDragging={isDragging}
            value={value}
            dataAudio={dataAudio}
            setValue={setValue}
          />

          <VolumeSlider
            className="flex bg-red-900 h-full   w-full  md:flex items-center select-none no-select"
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

                <AudioThumbSlider
                  value={value}
                  className={clsx(
                    "absolute  w-[20px] rounded-full h-[20px] top-1/2 -translate-y-1/2 bg-black -translate-x-[10px]"
                  )}
                />
              </div>
            </VolumeSliderActionWrapper>
          </VolumeSlider>
        </div>
      </div>
      <button className="lg:hidden text-white" role="focus">
        vol
      </button>
    </div>
  );
}

export default Volume;
