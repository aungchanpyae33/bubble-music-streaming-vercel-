import React from "react";

interface prop {
  dataAudio: React.MutableRefObject<HTMLAudioElement | null>;
  data: number;
  sege: number | undefined;
  duration: number | undefined;
}

export function playBackRate({ dataAudio, data, sege, duration }: prop) {
  dataAudio.current!.currentTime = data;

  const audioPosition = (data / duration!) * 100;
  // change to math.round to get data more precies
  // it can be greate if can fetch needed data it self (further) but it can not be fully accurate cuz all segemetns are not the same size
  const segPosition = Math.round((sege! * audioPosition) / 100);
  return segPosition;
}
