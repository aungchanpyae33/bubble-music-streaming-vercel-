import { ReactNode, useContext } from "react";
import DataContext from "@/lib/MediaSource/ContextMedia";
import AudioSeekBar from "./SliderUi/AudioSeekBar";
import AudioWrapper from "./AudioWrapper";
export interface PropTime {
  cur: number;
  durationTime: number | undefined;
}
function AudioElement({ Child, url }: { Child: ReactNode; url: string }) {
  const { dataAudio, duration } = useContext(DataContext);

  return (
    <div className=" w-full flex items-center ">
      <AudioWrapper dataAudio={dataAudio} url={url} />
      <AudioSeekBar duration={duration} key={url} />
      {Child}
    </div>
  );
}

export default AudioElement;
