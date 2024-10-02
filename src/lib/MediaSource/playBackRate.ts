import React from "react";

interface prop {
  dataAudio: React.MutableRefObject<HTMLAudioElement | null>;
  data: string;
  sege: number | undefined;
}
export function playBackRate({ dataAudio, data, sege }: prop) {
  dataAudio.current!.currentTime = +data;
  const audioDu = dataAudio.current!.duration;
  const audioCu = dataAudio.current!.currentTime;
  const audioPosition = Math.floor((audioCu / audioDu) * 100);
  const segPosition = Math.floor((sege! * audioPosition) / 100);

  return segPosition;
}
