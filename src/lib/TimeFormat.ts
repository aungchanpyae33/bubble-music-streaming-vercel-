export const TimeFormat = (sec: number | undefined) => {
  if (sec) {
    const minutes = Math.round(sec / 60);
    const seconds = Math.round(sec % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  } else {
    return "0:00";
  }
};
