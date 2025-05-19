export const TimeFormat = (sec: number | undefined) => {
  if (sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.round(sec % 60);

    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  } else {
    return "00:00";
  }
};
