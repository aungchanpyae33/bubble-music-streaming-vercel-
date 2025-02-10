import { TimeFormat } from "@/lib/TimeFormat";
import { ReactNode, useContext, useRef, useState } from "react";
import DataContext from "@/lib/MediaSource/ContextMedia";
import AudioSeekBar from "./AudioSeekBar";
import TimeIndicatorCur from "./TimeIndicatorCur";
export interface PropTime {
  cur: number;
  durationTime: number | undefined;
}
function AudioElement({ Child }: { Child: ReactNode }) {
  const dataInput = useRef<HTMLInputElement>(null);
  const [bottom, setBottom] = useState(true);
  const dataCur = useRef<HTMLSpanElement>(null);
  const { dataAudio, duration } = useContext(DataContext);
  return (
    <div className="flex items-center">
      <audio ref={dataAudio} className="hidden" hidden autoPlay></audio>

      <AudioSeekBar
        dataCur={dataCur}
        bottom={bottom}
        setBottom={setBottom}
        duration={duration}
        dataInput={dataInput}
      />
      {Child}
    </div>
  );
}

export default AudioElement;
