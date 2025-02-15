import { TimeFormat } from "@/lib/TimeFormat";
import { ReactNode, useContext, useRef, useState } from "react";
import DataContext from "@/lib/MediaSource/ContextMedia";
import AudioSeekBar from "./AudioSeekBar";
import AudioWrapper from "./AudioWrapper";
export interface PropTime {
  cur: number;
  durationTime: number | undefined;
}
function AudioElement({ Child, url }: { Child: ReactNode; url: string }) {
  const dataInput = useRef<HTMLInputElement>(null);
  const [bottom, setBottom] = useState(true);
  const dataCur = useRef<HTMLSpanElement>(null);
  const { dataAudio, duration } = useContext(DataContext);

  return (
    <div className=" w-full flex items-center ">
      <AudioWrapper dataAudio={dataAudio} url={url} />
      <AudioSeekBar
        dataCur={dataCur}
        bottom={bottom}
        setBottom={setBottom}
        duration={duration}
        dataInput={dataInput}
        key={url}
      />
      {Child}
    </div>
  );
}

export default AudioElement;
