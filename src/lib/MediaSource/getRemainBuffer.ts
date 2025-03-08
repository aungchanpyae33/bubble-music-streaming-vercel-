import { RefObject } from "react";

const datatest = [
  10.005, 19.989, 29.995, 40, 50.005, 59.989, 69.995, 80, 90.005, 99.989,
  109.995, 120, 130.005, 139.989, 149.995, 160, 170.005, 179.989, 189.995, 200,
  210.005, 219.989, 229.995, 239.467,
];

export function getRemainingBufferDuration(
  dataAudio: RefObject<HTMLAudioElement | null>
) {
  const buffered = dataAudio.current!.buffered;
  const currentTime = dataAudio.current!.currentTime;
  for (let i = 0; i < buffered.length; i++) {
    if (currentTime >= buffered.start(i) && currentTime <= buffered.end(i)) {
      const data = datatest.findIndex(
        (item) => item === +buffered.end(i).toFixed(3)
      );
      const remainingBuffer = buffered.end(i) - currentTime;
      // data+2 means already loaded buffer + next unloaded segement
      //data + 1 means already loaded buffer
      const segData = data + 2;
      return { remainingBuffer, segData };
    }
  }
  return { remainingBuffer: 0, segData: -1 };
}
