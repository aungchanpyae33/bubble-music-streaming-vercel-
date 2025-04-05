import { VolumeValueActions } from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";
import { Volume2, VolumeX } from "lucide-react";
import React, { RefObject, useState } from "react";
interface Props extends React.ComponentProps<"button"> {
  value: number;
  setValue: VolumeValueActions["setValue"];
  dataAudio: RefObject<HTMLAudioElement | null>;
}
function VolumeMuteButton({ value, setValue, dataAudio }: Props) {
  const [mute, setMute] = useState(100);
  // console.log(mute);
  return (
    <button
      className="w-[50px]  flex items-center justify-center"
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
      {value === 100 ? (
        <IconWrapper size="small" Icon={VolumeX} />
      ) : (
        <IconWrapper size="small" Icon={Volume2} />
      )}
    </button>
  );
}

export default VolumeMuteButton;
