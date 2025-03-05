import { VolumeValueActions } from "@/lib/zustand";
import React, { RefObject, useState } from "react";

function VolumeMuteButton({
  value,
  setValue,
  dataAudio,
}: {
  value: number;
  setValue: VolumeValueActions["setValue"];
  dataAudio: RefObject<HTMLAudioElement | null>;
}) {
  const [mute, setMute] = useState(100);
  console.log(mute);
  return (
    <button
      className="text-white  w-[50px] bg-black  lg:inline-block inline-block"
      onClick={() => {
        if (value < 100) {
          dataAudio.current!.volume = 0;
          setValue(100);
          setMute(value);
        } else {
          // to prevetn the value to be 0 in initaal state when mute is not modified
          if (mute === 100) {
            const volValue = 1;
            dataAudio.current!.volume = volValue;
            setValue(0);
          } else {
            const volValue = 1 - mute / 100;
            dataAudio.current!.volume = volValue;
            setValue(mute);
          }
        }
      }}
    >
      {value === 100 ? "Un" : "Mu"}
    </button>
  );
}

export default VolumeMuteButton;
