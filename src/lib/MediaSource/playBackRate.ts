import { RefObject } from "react";

interface prop {
  dataAudio: RefObject<HTMLAudioElement | null>;
  data: number;
  sege: number | undefined;
  duration: number | undefined;
}

export function playBackRate({ dataAudio, data, sege, duration }: prop) {
  dataAudio.current!.currentTime = data;

  const audioPosition = Math.floor((data / duration!) * 100);
  const datatest = [
    10.005, 19.989, 29.995, 40, 50.005, 59.989, 69.995, 80, 90.005, 99.989,
    109.995, 120, 130.005, 139.989, 149.995, 160, 170.005, 179.989, 189.995,
    200, 210.005, 219.989, 229.995, 239.467,
  ];
  // change to math.round to get data more precies
  // it can be greate if can fetch needed data it self (further) but it can not be fully accurate cuz all segemetns are not the same size

  let segPosition = Math.round((sege! * audioPosition) / 100);
  let final = segPosition;
  for (
    let index = data;
    index > datatest[segPosition - 1];
    datatest[segPosition++]
  ) {
    final++;
  }
  return final;
}
