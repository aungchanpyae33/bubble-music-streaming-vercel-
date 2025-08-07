export const TimeFormat = (sec: number | undefined) => {
  if (typeof sec === "number" && !isNaN(sec)) {
    const totalSeconds = Math.round(sec); // round first
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  } else {
    return "00:00";
  }
};
