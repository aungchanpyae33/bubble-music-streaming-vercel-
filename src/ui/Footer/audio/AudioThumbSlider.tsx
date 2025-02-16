function AudioThumbSlider({ value }: { value: number }) {
  return (
    <span
      className="absolute group-hover:inline  hidden group-focus:inline    w-[20px] rounded-full h-[20px] top-1/2 -translate-y-1/2 bg-black -translate-x-[10px]"
      style={{ left: `calc(100% - ${value}%)` }}
    ></span>
  );
}

export default AudioThumbSlider;
