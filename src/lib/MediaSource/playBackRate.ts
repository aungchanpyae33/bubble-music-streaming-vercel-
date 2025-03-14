import { RefObject } from "react";
import { getRemainingBufferDuration } from "./getRemainBuffer";

interface prop {
  dataAudio: RefObject<HTMLAudioElement | null>;
  data: number;
  sege: number | undefined;
  duration: number | undefined;
  bufferThreshold: number;
}

export function playBackRate({
  dataAudio,
  data,
  sege,
  duration,
  bufferThreshold,
}: prop) {
  dataAudio.current!.currentTime = data;
  const { remainingBuffer, segData } = getRemainingBufferDuration(dataAudio);
  // console.log("10", remainingBuffer);
  //only return updated the segNum with conditional to prevent segment chagne to previous already loaded segment

  const audioPosition = Math.floor((data / duration!) * 100);
  const datatest = [
    10.005, 19.989, 29.995, 40, 50.005, 59.989, 69.995, 80, 90.005, 99.989,
    109.995, 120, 130.005, 139.989, 149.995, 160, 170.005, 179.989, 189.995,
    200, 210.005, 219.989, 229.995, 239.467,
  ];
  // change to math.round to get data more precies
  // it can be greate if can fetch needed data it self (further) but it can not be fully accurate cuz all segemetns are not the same size

  let segPosition = Math.floor((sege! * audioPosition) / 100);
  let final = segPosition;
  for (
    let index = data;
    index > datatest[segPosition - 1];
    datatest[segPosition++]
  ) {
    final++;
  }

  // if already buffered. return segData , if not return dataG by conditional check to make sure that no additional load on if there was already loaded buffer segments

  if (bufferThreshold < remainingBuffer) return segData;
  // data+2 means already loaded buffer + next unloaded segement
  //data + 1 means already loaded buffer
  //  in this case SegeData -1 is equal to the segData + 1 which is data of the segments that has loaded buffer
  const datag = final === segData - 1 ? final + 1 : final;
  console.log(datag);
  return datag;
}
