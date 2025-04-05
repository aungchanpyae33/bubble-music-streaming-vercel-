import useVolumeSeek from "@/lib/CustomHooks/VolumeSeek";
import DataContext from "@/lib/MediaSource/ContextMedia";
import { useContext, useMemo, useRef } from "react";
import AudioThumbSlider from "../audio/SliderUi/AudioThumbSlider";
import AudioProgressbar from "../audio/SliderUi/AudioProgressbar";
import VolumeSlider from "./VolumeSlider";
import VolumeSliderActionWrapper from "./VolumeSliderActionWrapper";
import clsx from "clsx";
import VolumeMuteButton from "./VolumeMuteButton";
import { Volume2, VolumeX } from "lucide-react";
import IconWrapper from "@/ui/general/IconWrapper";

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
    <div className=" flex lg:w-full items-center  group p-1  ">
      <div
        className={clsx(
          "absolute group-hover:bg-[#222222]  group-hover:lg:bg-inherit  h-full group-hover:flex lg:static lg:w-full lg:flex right-0  w-full",
          {
            "flex bg-[#222222] lg:bg-inherit": isDragging,
            hidden: !isDragging,
          }
        )}
      >
        <div className="flex  w-fit gap-1  flex-1">
          <VolumeMuteButton
            value={value}
            dataAudio={dataAudio}
            setValue={setValue}
          />

          <VolumeSlider
            className="flex  h-full   w-full px-[7px]  md:flex items-center select-none no-select"
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
              <div className=" w-full h-[2px] bg-[rgba(255,255,255,0.2)] relative">
                <AudioProgressbar value={value} progressRef={progressRef} />

                <AudioThumbSlider
                  value={value}
                  className={clsx(
                    "absolute  w-[14px] rounded-full h-[14px] top-1/2 -translate-y-1/2  -translate-x-[7px] bg-white"
                  )}
                />
              </div>
            </VolumeSliderActionWrapper>
          </VolumeSlider>
        </div>
      </div>
      <button className="lg:hidden ">
        {" "}
        {value === 100 ? (
          <IconWrapper size="small" Icon={VolumeX} />
        ) : (
          <IconWrapper size="small" Icon={Volume2} />
        )}
      </button>
    </div>
  );
}

export default Volume;
