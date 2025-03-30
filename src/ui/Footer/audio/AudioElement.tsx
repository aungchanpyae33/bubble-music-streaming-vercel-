import { ReactNode, useContext } from "react";
import DataContext from "@/lib/MediaSource/ContextMedia";
import AudioSeekBar from "./SliderUi/AudioSeekBar";
import AudioWrapper from "./AudioWrapper";
import AudioSeekBarWrapper from "./AudioSeekBarWrapper";
import TimeIndicatorCur from "./Time/TimeIndicatorCur";
export interface PropTime {
  cur: number;
  durationTime: number | undefined;
}
function AudioElement({ Child, url }: { Child: ReactNode; url: string }) {
  const { dataAudio, duration } = useContext(DataContext);

  return (
    <div className=" w-full flex items-center ">
      <AudioWrapper dataAudio={dataAudio} url={url} />
      <AudioSeekBarWrapper>
        <AudioSeekBar
          url={url}
          hideSliderInSmScreen={true}
          childrenFn={(value) => (
            <TimeIndicatorCur
              value={value}
              duration={duration}
              className="text-sm md:text-base w-[5rem] text-center hidden sm:inline"
            />
          )}
          duration={duration}
          key={url}
          className="w-full h-[3px] sm:hidden bg-[rgba(255,255,255,0.2)] relative"
        />
      </AudioSeekBarWrapper>
      {Child}
    </div>
  );
}

export default AudioElement;
